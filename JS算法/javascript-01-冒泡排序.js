/* 
    实现原理：
    数组中有n个数，比较每相邻两个数，如果前者大于后者，就把两个数交换位置；
    这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过n-1（数组的 length - 1） 轮，就完成了所有数的排序。
    只需length-1 轮，足够循环，i+1 就能拿到最后的值和前一项做对比
*/

//方法一
{
    //找出数组最大值放到数组最后面
    var arr = [3, 10, 6, 2];
    // 遍历数组 
    for (var i = 0; i < arr.length - 1; i++) {
        // 如果前一个数 大于 后一个数 就交换两数位置
        if (arr[i] > arr[i + 1]) {
            var num = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = num;
        }
    }
    console.log(arr) // [ 3, 6, 2, 10 ]

    //重复length-1次，就能实现数组从小到大排序了(每次循环都将剩余的数组中的最大值排在后面)
    var arr = [3, 10, 6, 2];
    // 遍历数组
    for (var i = 0; i < arr.length - 1; i++) {
        // 这里 i < arr.length - 1 ?????
        for (var j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var num = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = num;
            }
        }
    }
    console.log(arr)  // [ 2, 3, 6, 10 ]
}



//方法二(优化版)
/* 
    方法一有缺陷，当第一次找到最大值并放到最后的时候，下一次在遍历的时候就不算最大值了，因为它就是最大值了，不会再出现交换位置的情况。
    在下一次遍历的是时候就应该去掉最大值，这样才合适

*/
{
    var arr = [3, 10, 6, 2];
// 遍历数组
for (var i = 0; i < arr.length - 1; i++) {
    // 这里要根据外层for循环的 i ，逐渐减少内层 for 循环的次数
    for (var j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
            var num = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = num;
        }
    }
}
console.log(arr)  // [ 2, 3, 6, 10 ]
}

/* 
    总结：
        外层 for 循环控制循环次数
        内层 for 循环进行两数交换，找每次的最大数，排到最后
*/