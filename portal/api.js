// ========== API.js - Работа с Google Apps Script ==========

const API_URL = 'https://script.google.com/macros/s/AKfycbyi34X_3chhhP5JXuQldOc35pgFfxDOg2cCpQ9CpndVKTElRkT9PYw-t2IYCZqA5tnR/exec'; // ← СЮДА ВСТАВЬТЕ ВАШ URL

async function apiCall(action, params = {}) {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', action);
        Object.keys(params).forEach(k => url.searchParams.append(k, params[k]));
        
        console.log(`📡 API Call: ${action}`, params);
        
        const response = await fetch(url.toString());
        const data = await response.json();
        
        console.log(`✅ API Response: ${action}`, data);
        
        return data;
    } catch (error) {
        console.error(`❌ API Error (${action}):`, error);
        return { error: error.message };
    }
}

async function registerOrGetUser(name, phone) {
    return await apiCall('registerOrGet', { name, phone });
}

async function getAllUsers() {
    const result = await apiCall('getAllUsers');
    if (result.error) {
        console.error('getAllUsers error:', result.error);
        return [];
    }
    return result;
}

async function updateProgressOnServer(phone, blocks_completed, avg_grade, exam_status, exam_comment, accepted_flag, accepted_date) {
    return await apiCall('updateProgress', {
        phone,
        blocks_completed,
        avg_grade,
        exam_status,
        exam_comment,
        accepted_flag,
        accepted_date
    });
}

async function getAdaptationStatus(phone) {
    return await apiCall('getAdaptationStatus', { phone });
}

async function updateAcceptedStatus(phone, accepted, acceptedDate) {
    return await apiCall('updateAccepted', { phone, accepted, acceptedDate });
}

async function getAdaptationData(phone) {
    return await apiCall('getAdaptationData', { phone });
}

async function updateAdaptationData(phone, week, block_name, calls, conversion, revenueNew, revenueTotal) {
    return await apiCall('updateAdaptationData', { 
        phone, week, block_name, 
        calls, conversion, revenueNew, revenueTotal 
    });
}