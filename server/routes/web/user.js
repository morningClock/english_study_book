module.exports = router => {
  /**
   * GET /login
   * [登录接口]
   * @return 'success'
   */
  router.get('/login', (req, res) => {
    res.send('login success')
  })

  /**
   * GET /register
   * [登录接口]
   * @return 'success'
   */
  router.get('/register', (req, res) => {
    res.send('register success')
  })

   /**
   * POST /register
   * [注册接口]
   * @return 'success'
   */
  router.post('/register', (req, res) => {
    res.send('register success')
  })

  /**
   * POST /retrieve
   * [找回密码接口]
   * @return 'success'
   */
  router.post('/register', (req, res) => {
    res.send('register success')
  })

  /**
   * GET /profile
   * [获取个人中心信息]
   * @return 'success'
   */
  router.get('/profile', (req, res) => {
    res.send('register success')
  })

  /**
   * POST /profile
   * [修改个人信息]
   * @return 'success'
   */
  router.post('/profile', (req, res) => {
    res.send('register success')
  })

  return router
}