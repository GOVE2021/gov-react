import { message } from "antd";
import axios from "axios";
import router from 'umi/router';
import { logOut } from '@utils/authLocal';

message.config({
  top: 10,
  duration: 2,
  maxCount: 1,
});
// let baseUrl =  ''; // 本地mock
let baseUrl =  'http://61.150.107.199:7081'; // 客户
// let baseUrl =  'http://47.105.192.57:7088'; // 联调

const instance = axios.create({
    timeout: 5000, // 超时时间
    baseURL: baseUrl
});

instance.interceptors.request.use(
	function(config) {
		config.headers["token"] = localStorage.getItem("token");
		config.headers["cache-control"] = 'no-cache';
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	function(response) {
		if (response?.data?.code === 403) {
			message.error('登陆过期，请重新登陆');
			//跳转login
			logOut();
			router.replace('/');
		} 
		return response;
	},
	function(error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

// axios.defaults.headers.common['authorization'] = "Bearer " + localStorage.getItem('token')

export const GET = (url, params) => {
	return instance.get(`${baseUrl}${url}`, { params: params }).then(data => {
		return data;
	});
};

export const POST = (url, params) => {
	return instance.post(`${baseUrl}${url}`, params).then(data => {
		return data;
	});
};

export const PUT = (url, params) => {
	return instance.put(`${baseUrl}${url}`, params).then(data => {
		return data;
	});
};

export const DELETE = url => {
	return instance.delete(`${baseUrl}${url}`).then(data => {
		return data;
	});
};
