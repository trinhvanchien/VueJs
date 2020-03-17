/**
 * Controller photo library category for project
 * author: Le khang
 * updater: ___
 * date up: 23/09/2019
 * date to: ___
 * team: BE-RHP
 */
const SpinTheme = require("../models/SpinTheme.model");
const jsonResponse = require("../configs/response");

module.exports = {
  create: async (req, res) => {
    let newSpinTheme;

    // check validate
    if (req.body.name === "") {
      return res.status(403).json({
        status: "fail",
        data: { title: "Tên chủ đề không được bỏ trống!" }
      });
    }

    // handle crete mongo
    newSpinTheme = await new SpinTheme({
      name: req.body.name,
      description: req.body.description
    });

    // Save mongodb
    await newSpinTheme.save();

    res.status(200).json(jsonResponse("success", newSpinTheme));
  },
  /**
   * Dùng để xem thông tin về các chủ đề từ khóa. Sẽ xuất ra kết quả mặc định là 10 kết quả.
   */
  index: async (req, res) => {
    let dataResponse;

    let queryResult = await SpinTheme.find({}).limit(10);

    let entryCount = await SpinTheme.count({});

    dataResponse = {
      data: queryResult,
      totalPages: Math.ceil(entryCount / 10),
    };
    console.log("[MESSAGE]: totalPages", dataResponse.totalPages);
    res.status(200).json(jsonResponse("success", dataResponse));
  },
  /**
   * Lấy về tất cả các kết quả mà không phân trang.
   */
  getUnpaginated: async (req, res) => {
    let dataResponse = await SpinTheme.find({});

    res.status(200).json(jsonResponse("success", dataResponse));
  },
  /**
   * Hàm được gọi khi cần lướt qua các trang khi phân trang, tìm kiếm theo từ khóa.
   */
  indexOptions: async (req, res) => {
    let dataResponse;
    let searchKey = {};

    if (!req.body.currentPage) {
      req.body.currentPage = 1;
    }

    if (!req.body.pageSize) {
      req.body.pageSize = 10;
    }

    if (req.body.searchKey) {
      searchKey = {
        $or: [
          { name: new RegExp(req.body.searchKey.normalize(), "gi") },
          { description: new RegExp(req.body.searchKey.normalize(), "gi") }
        ]
      };
    }

    let pageSkipped = (req.body.currentPage - 1) * req.body.pageSize;

    let queryResult = await SpinTheme.find(searchKey)
      .skip(pageSkipped)
      .limit(req.body.pageSize);

    let entryCount = await SpinTheme.count(searchKey);

    dataResponse = {
      data: queryResult,
      currentPage: req.body.currentPage,
      totalPages: Math.ceil(entryCount / req.body.pageSize)
    };

    res.status(200).json(jsonResponse("success", dataResponse));
  },
  detail: async (req, res) => {
    console.log("[MESSAGE]: req.params.id", req.params.id);
    let dataResponse = await SpinTheme.findById(req.params.id).lean();

    if (!dataResponse) {
      return res
        .status(404)
        .json(jsonResponse({ status: 404, data: "Không tìm thấy chủ đề!" }));
    }
    res.status(200).json(jsonResponse("success", dataResponse));
  },
  update: async (req, res) => {
    console.log(req.params);
    // Check validator
    if (req.body.title === "") {
      return res.status(403).json({
        status: "fail",
        data: { title: "Tên chủ đề không được bỏ trống!" }
      });
    }

    const findSpinTheme = await SpinTheme.findOne({ _id: req.params.id });

    // Check catch when update post categories
    if (!findSpinTheme) {
      return res
        .status(404)
        .json({ status: "error", message: "Chủ đề không tồn tại!" });
    }

    res
      .status(201)
      .json(
        jsonResponse(
          "success",
          await SpinTheme.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          )
        )
      );
  },
  delete: async (req, res) => {
    // Check if don't use query
    if (req.params.id === undefined || req.params.id.length === 0) {
      return res.status(403).json({
        status: "fail",
        _id: "Vui lòng cung cấp query ID để xác thực chủ đề muốn xóa!"
      });
    }

    const spinThemeInfo = await SpinTheme.findOne({ _id: req.params.id });

    // Check error
    if (!spinThemeInfo) {
      return res
        .status(404)
        .json({ status: "error", message: "Chủ đề không tồn tại!" });
    }

    // Remove package
    await spinThemeInfo.remove();
    res.status(200).json({ status: "success", data: null });
  }
};
