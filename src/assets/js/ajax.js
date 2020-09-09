import axios from "axios";
import api from "@/assets/js/api.js";

const urlObj = api.urlObj;

export default {
    ajax(options) {
        const {
            urlKey,                  //用来找出请求的地址
            postKey,                                //请求的key， 用于区分同个请求地址，不同请求参数，（只有在第一个请求还没回来，然后就切换参数，发送第二个请求的时候才用得到，一般是用不到的）
            post,                         //post数据
            success,
            fail,
            complete,
        } = options;

        post.token = localStorage.getItem("token") || '';

        console.log('请求的参数============');
        console.log(post);

        return axios({
            url: 'https://www.ldbbeer.com' + urlObj[urlKey],
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: [
                function (data) {
                    let ret = '';
                    let _encodeURIComponent = encodeURIComponent;
                    for (let i in data) {
                        if (data[i].__proto__.constructor === Array) {
                            for (let j = 0; j < data[i].length; j++) {
                                ret += _encodeURIComponent(i + '[]') + '=' + _encodeURIComponent(data[i][j]) + '&';
                                console.log(`${ret}`)
                            }
                        } else {
                            ret += _encodeURIComponent(i) + '=' + _encodeURIComponent(data[i]) + '&';
                        }
                    }
                    return ret;
                }
            ],
            data: post || {},
        }).then((result) => {
            switch (result.status) {
                case 200:
                    let postSuccessRet = result.data;

                    console.log('---------------' + '请求成功：' + urlKey + '------------------');
                    console.log(postSuccessRet)
                    console.log('---------------' + '请求成功：' + urlKey + '------------------');

                    if (Number(postSuccessRet.code) === - 1) {
                        this.$toast({
                            msg: postSuccessRet.msg,
                            duration: 2000,
                        });
                    }
                    if (Number(postSuccessRet.code) === -90001) {
                        if (!this.isToLogined) {
                            this.$toast({
                                msg: postSuccessRet.msg,
                            });
                            console.log('重新登录');

                            this.isToLogined = true;
                            this.$nextTick(() => {
                                this.$router.push({
                                    name: "loginOrRegister",
                                    params: this.$route.query,
                                });
                            });

                            console.log(this.$route.query)
                        }
                        fail && fail();
                        complete && complete();
                        return false;
                    }

                    success(postSuccessRet);

                    break;
                case 500:
                    this.$toast({
                        msg: '网络欠佳',
                        duration: 2000,
                    });
                    break;
                default:
                    this.$toast({
                        msg: '请求出错，未知错误',
                        duration: 2000,
                    });
                    break;
            }

        }).catch(err => {
            console.error(err);
            
            fail && fail();

            this.$toast({
                msg: (err && err.msg) || '请求失败',
            });

        }).finally(() => {
            complete && complete();
        });
    },
}