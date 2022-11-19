const { Router } = require('express');
const router = Router();

router.route('/').get( (req,res) => res.render('chat.ejs')  );

module.exports = router;