/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable newline-after-var */
/* eslint-disable arrow-parens */
/**
 * Controller photo library category for project
 * author: Le khang
 * updater: ___
 * date up: 23/09/2019
 * date to: ___
 * team: BE-RHP
 */
const SpinWord = require("../models/SpinWord.model");
const SpinTheme = require("../models/SpinTheme.model");
const jsonResponse = require("../configs/response");

module.exports = {
  create: async (req, res) => {
    let newSpinWord;

    // check validate
    if (req.body.name === "") {
      return res.status(403).json({
        status: "fail",
        data: { title: "Tên từ khoá không được bỏ trống!" }
      });
    }

    // handle crete mongo
    newSpinWord = await new SpinWord({
      name: req.body.name,
      key: req.body.key,
      theme: req.body.theme
    });

    // Save mongodb
    await newSpinWord.save();

    return res.status(200).json(jsonResponse("success", newSpinWord));
  },
  index: async (req, res) => {
    let dataResponse = null;

    if (req.query._id) {
      dataResponse = await SpinWord.findOne({ _id: req.query._id })
        .populate({ path: "theme", select: "_id name description" })
        .sort({ createdAt: "desc" })
        .lean();
    } else if (
      Object.entries(req.query).length === 0 && req.query.constructor === Object
    ) {
      dataResponse = await SpinWord.find({})
        .populate({ path: "theme", select: "_id name description" })
        .sort({ createdAt: "desc" })
        .lean();
    }

    return res.status(200).json(jsonResponse("success", dataResponse));
  },
  update: async (req, res) => {
    // Check validator
    if (req.body.title === "") {
      return res.status(403).json({
        status: "fail",
        data: { title: "Tên chủ đề không được bỏ trống!" }
      });
    }

    const findSpinWord = await SpinWord.findOne({ _id: req.query._id });

    // Check catch when update post categories
    if (!findSpinWord) {
      return res
        .status(404)
        .json({ status: "error", message: "Chủ đề không tồn tại!" });
    }

    return res
      .status(201)
      .json(
        jsonResponse(
          "success",
          await SpinWord.findByIdAndUpdate(
            req.query._id,
            { $set: req.body },
            { new: true }
          )
        )
      );
  },
  delete: async (req, res) => {
    // Check if don't use query
    if (req.query._id === undefined || req.query._id.length === 0) {
      return res.status(403).json({
        status: "fail",
        _id: "Vui lòng cung cấp query ID để xác thực chủ đề muốn xóa!"
      });
    }

    const spinWordInfo = await SpinWord.findOne({ _id: req.query._id });

    // Check error
    if (!spinWordInfo) {
      return res
        .status(404)
        .json({ status: "error", message: "Chủ đề không tồn tại!" });
    }

    // Remove package
    await spinWordInfo.remove();
    res.status(200).json({ status: "success", data: null });
  },
  getWordByKey: async (req, res) => {
    let wordInfo, dataResponse;

    wordInfo = await SpinWord.findOne({ _id: req.body._id })
      .populate({ path: "theme", select: "_id name description" })
      .lean();
    dataResponse = await SpinWord.find({ key: req.body.key })
      .populate({ path: "theme", select: "_id name description" })
      .lean();

    console.log(wordInfo);
    console.log(dataResponse);

    if (!wordInfo) {
      return res
        .status(404)
        .json({ status: "error", message: "Tên từ khóa không tồn tại" });
    }

    if (dataResponse) {
      return res.status(201).json(jsonResponse("success", dataResponse));
    }
  },
  /**
   * Request cần phải chứa nội dung (text) và chủ đề (theme) trong body. Khi gửi văn bản cần spin phải kèm theo 1 chủ đề.
   */
  spin: async (req, res) => {
    console.log("[MESSAGE]: req", req.body);

    const commonTheme = await SpinTheme.findOne({ name: "Chung" });
    const customTheme = await SpinTheme.findOne({ name: req.body.theme });

    const commonFilter = await SpinWord.find({ theme: commonTheme._id }).lean();
    const categoryFilter = await SpinWord.find({
      theme: customTheme._id
    }).lean();
    let text = req.body.text;
    if (text === null || text === "") {
      return res.status(403).json({ status: "error", message: "Văn bản rỗng" });
    }
    text = wordRevolver(commonFilter, text);
    text = wordRevolver(categoryFilter, text);

    return res.status(201).json(jsonResponse("success", text));
  }
};
/**
 * Hàm chính để spin content.
 * Luồng sẽ chạy như sau:
 * - Duyệt từng từ một trong filter.
 * - Nếu match từ trong đoạn văn bản mẫu, thì thay thế bằng một từ đồng nghĩa bất kỳ.
 * - Trả lại văn bản đã thay đổi.
 * @param {*} dict filter dùng cho chủ đề cần spin
 * @param {*} text đoạn văn bản cần spin
 */
const wordRevolver = (dict, text) => {
  const sentenceStopRegex = /[\.\!\?]/;

  dict.forEach(keyword => {
    let regex = new RegExp(`(${keyword.key})`, "gi");
    if (regex.test(text) === true) {
      let textArr = text.split(regex);
      let synonyms = dict.filter(item => item.key === keyword.key);
      for (let i = 0; i < textArr.length - 1; i++) {
        if (textArr[ i ].toUpperCase() === keyword.key.toUpperCase()) {
          let random = Math.floor(Math.random() * synonyms.length);
          textArr[ i ] = synonyms[ random ].name;

          let lastIndex = textArr[ i - 1 ].trim();
          if (
            i > 0 && sentenceStopRegex.test(lastIndex[ lastIndex.length - 1 ])
          ) {
            textArr[ i ] = textArr[ i ].replace(
              textArr[ i ][ 0 ],
              textArr[ i ][ 0 ].toUpperCase()
            );
          }
        }
      }
      text = textArr.join("");
    }
  });
  return text;
};
