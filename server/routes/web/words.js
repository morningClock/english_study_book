const Word = require('../../models/Word')
const WordClass = require('../../models/WordClass')
const UserWordList = require('../../models/UserWordList')

const authMiddleware = require('../../middlewares/auth.js')

module.exports = router => {
  /**
   * POST /words/save
   * [保存单词]
   * @ObjectId   userId       用户id
   * @String     name         单词名称
   * @Object     translations 
   *   {
   *     @ObjectId   wordClassId  词性id
   *     @String     explain      释义
   *   }
   * @Array      useage:[@String 用例]
   * 
   * @return 'success'
   */
  router.post('/words/save', authMiddleware(), async (req, res) => {
    // 保存单词逻辑
    // 1.查找是否存在单词
    // 2.
    //   存在单词，将找出的单词id存入用户单词表中
    //   不存在单词，将单词解释存入单词表
    // 3.将存入单词表后得到的ID，存入对应用户的单词id表中
    let body = req.body
    let word = await Word.findOne({name: body.name})
    if(null === word) {
      // 加入单词表
      word = await Word.create(body)
    }
    // 单词列表中不存在时才推入用户单词表
    let isExist = await UserWordList.findOne({
      wordList:{
        $elemMatch:{wordId: word.id}
      }
    })
    if(!isExist){
      // push进用户单词表，push之前先检测是否已经拥有
      await UserWordList.updateOne(
        {userId: req.userId},
        {
          $push: {wordList: {wordId: word.id}}
        }
      )
    }
    res.send('success')
  })

  return router
}