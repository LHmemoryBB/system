const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { response } = require("express");

//获取座位
exports.getAll = (req, res) => {
  const sql = "select * FROM seats"; // DESC降序  ORDER BY id  DESC
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
  console.log(req.query, "添加座位");
  const sql = `INSERT INTO seats (status, floor) VALUES (0, ${req.query.floor})`;
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
  let reservationNumber = 0;
  let id = req.body.id;
  const sql = `SELECT * FROM reservations WHERE seat_id = ?;`;
  db.query(sql, id, (err, results) => {
    console.log(results, "查找结果");
    if (results.length > 0) {
      results.forEach((item) => {
        console.log(item);
        if (item.reservation_status == 3) {
          reservationNumber++;
        }
      });
      if (reservationNumber) {
        return res.send({
          status: 1,
          message: "删除失败，该座位已被其他学生预约",
        });
      } else {
        const sql = "DELETE FROM seats WHERE id = ?";
        db.query(sql, [id], (err) => {
          return res.send({
            status: 0,
            message: "删除成功",
          });
        });
      }
    } else {
      const sql = "DELETE FROM seats WHERE id = ?";
      db.query(sql, [id], (err) => {
        return res.send({
          status: 0,
          message: "删除成功",
        });
      });
    }
  });
};
