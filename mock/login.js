import Mock from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  // 'GET /api/user/list': responseData,
  'POST /api/login': (req, res)=>{
    setTimeout(() => {  //延时
      const { password, name } = req.body;
      if (password === 'e10adc3949ba59abbe56e057f20f883e' || password === '123456'){
        res.status(200).send({msg: '登陆成功', code: 200, token: '1234', data:{name} });
      } else {
        res.status(200).send({msg: '登陆失败', code: 40001});
      }
      
    },100);
  },
}
