// THROW ERR
const throwErr = (req, res) => {
    console.log(res);
    res.status(404).send("Something is wrong!")
};

module.exports = { throwErr };