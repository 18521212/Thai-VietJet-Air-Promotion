let response = (req, res, next) => {
    try {
        return res.status(200).json(res?.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports={
    response,
}