/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable eol-last */
'use strict';

const base64Config = require('../config/base64.config');
const dbConfig = require('../config/dbconfig');

/**
 * @function init 执行初始化
 * @description Set up btoa/atob function with NodeJS
 */
const init = () => {
    base64Config.init();
    dbConfig.init();
};

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

    const { router, controller } = app;

    // 执行初始化
    init();

    // 查询MSSQL数据库信息
    router.get('/api/v1/:table/:order', controller.database.where);

    // 新增MSSQL数据库记录
    router.post('/api/v1/:table/:node', controller.database.insert);

    // 更新MSSQL数据库记录
    router.patch('/api/v1/:table/:node', controller.database.update);

    // 删除MSSQL数据库记录
    router.delete('/api/v1/:table/:node', controller.database.delete);

    // 查询文件信息，并进行下载
    router.get('/api/v1/filebase/:file/:path', controller.filebase.query);

    // 查询文件信息，并进行下载(根据FileID)
    router.get('/api/v1/file/query/:file', controller.filebase.queryByFileID);

    // 推送企业微信机器消息
    router.get('/api/v1/wework/:title/:description', controller.wework.send);

    // 推送企业微信应用消息
    router.get('/api/v1/weappms/:userid/:message', controller.wework.appmessage);

    // 推送EMAIL机器消息
    router.get('/api/v1/mail/:title/:description/:receiver', controller.mail.send);

    // 查询企业微信用户信息
    router.get('/api/v2/wework_user/:userid', controller.wework.queryWeWorkUserInfo);

    // 查询企业微信部门成员信息
    router.get('/api/v2/wework_user_page/:page/:size', controller.wework.queryWeWorkDepartUser);

    // 查询企业微信部门成员信息
    router.get('/api/v2/wework_depart_user/:departid/:fetch', controller.wework.queryWeWorkDepartUser);

    // 查询企业微信部门成员信息(simple)
    router.get('/api/v2/wework_sdepart_user/:departid/:fetch', controller.wework.queryWeWorkSimpleDepartUser);

    // 查询企业微信部门列表信息
    router.get('/api/v2/wework_depart_list/:departid', controller.wework.queryWeWorkDepartlist);

    // 查询企业微信部门列表信息
    router.get('/api/v2/wework_depart/:departid', controller.wework.queryWeWorkDepartInfo);

    // 查询企业微信用户信息(网页授权)
    router.get('/api/v2/wework_user_code/:code', controller.wework.queryWeWorkUserByCode);

    // 上传文档附件
    router.post('/api/v1/upload', controller.upload.upload);

};