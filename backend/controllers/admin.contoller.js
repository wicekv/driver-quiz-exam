module.exports = {
    addQuestion: (req, res) => {
        const { question: {
            photo, ...rest
        }} = req.body;
        const question = new Question({
            ...rest,
            img: {
                data: photo,
                contentType: 'image/png'
            }
        });
        question.save((err, question) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.redirect('/admin');
        });
    }
}
