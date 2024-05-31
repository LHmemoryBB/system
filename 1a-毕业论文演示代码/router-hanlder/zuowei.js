const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { response } = require("express");

//获取座位
exports.getAll = (req, res) => {
  const sql = "select * FROM seats";// DESC降序  ORDER BY id  DESC
  db.query(sql, (err, results) => {
    if (err)
      return res.send({ message: err instanceof Error ? err.message : err });
    return res.send({
      status: 0,
      message: "获取座位成功",
      data: results,
    });
  });
};
//添加
exports.add = (req, res) => {
  const sql = "INSERT INTO seats (status) VALUES (0)";
  // console.log(sql,'sql')
  db.query(sql, (err, results) => {
    if (err)
      return res.send({ message: err instanceof Error ? err.message : err });
    return res.send({
      status: 0,
      message: "添加成功",
      data: results,
    });
  });
};
//删除
exports.del = (req, res) => {

  let id = req.body.id
  const sql = "DELETE FROM seats WHERE id = ?";
  console.log(sql, 'sql 38')

  db.query(sql, [id], (err) => {
    return res.send({
      status: 0,
      message: "删除成功",
    });
  });
};
