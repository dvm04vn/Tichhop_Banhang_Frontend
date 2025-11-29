/**
 * Trạng thái tồn kho hiển thị trên UI.
 * @typedef {'in_stock'|'out_of_stock'} InventoryStatus
 */

/**
 * Một dòng trong bảng Imported (UI).
 * @typedef {Object} ImportedRowUI
 * @property {string} id
 * @property {string} productName
 * @property {string} sku
 * @property {string} categoryName
 * @property {number} price
 * @property {number} stock
 * @property {number} sold
 * @property {string} color
 * @property {string} size
 * @property {InventoryStatus} status
 */

/**
 * Một bản ghi lỗi để hiển thị ở Error Log.
 * @typedef {Object} ImportErrorLogUI
 * @property {string} id
 * @property {number} row
 * @property {string|undefined} sku
 * @property {string|undefined} productName
 * @property {string} message
 * @property {string} createdAt
 * @property {string} fileName
 */

/**
 * State tổng cho màn hình import.
 * @typedef {Object} ImportSessionUI
 * @property {string} jobId
 * @property {{
 *   totalFiles:number;
 *   successfulFiles:number;
 *   failedFiles:number;
 *   totalRecords:number;
 *   totalErrors:number;
 * }} summary
 * @property {ImportedRowUI[]} importedRows
 * @property {ImportErrorLogUI[]} errorLogs
 */

export {};
