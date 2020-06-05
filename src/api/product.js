
import request from '../utils/request';

// 质检管理
export const produceTaskQuality = query => {
    return request({
        url: `/api/producetask/produceTaskQuality/page`,
        method: 'get',
        params: query
    });
}

// 生产效率
export const getProduceEfficient = query => {
    return request({
        url: `/api/producetask/produceTaskReport/getProduceEfficient`,
        method: 'get',
        params: query
    });
}

// 修改生产效率
export const getProduceEfficientput = query => {
    return request({
        url: `/api/producetask/produceTaskReport/getProduceEfficient`,
        method: 'put',
        data: query
    });
}
