/**
 * Created by ld on 12/1/15.
 */


module.exports = {
    chooseRandom :function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}