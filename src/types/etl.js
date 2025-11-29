/**
 * Tổng quan job ETL.
 * @typedef {Object} EtlJobSummary
 * @property {number} totalFiles
 * @property {number} successfulFiles
 * @property {number} failedFiles
 * @property {number} totalRecords
 * @property {number} totalErrors
 */

/**
 * Một record sản phẩm hợp lệ trong successFiles.data.
 * @typedef {Object} EtlSuccessRecord
 * @property {string} nameProduct
 * @property {string} categoryName
 * @property {number} price
 * @property {number} stock
 * @property {number} sold
 * @property {string} color
 * @property {string} size
 * @property {number} weight
 * @property {string} unit
 * @property {string} sku
 * @property {string} brand
 * @property {string} description
 */

/**
 * Một file xử lý thành công.
 * @typedef {Object} EtlSuccessFile
 * @property {string} fileName
 * @property {string} stagingId
 * @property {number} totalRecords
 * @property {string} timestamp
 * @property {EtlSuccessRecord[]} data
 * @property {string} _id
 */

/**
 * Dòng dữ liệu gốc trong file lỗi.
 * @typedef {Object.<string, string|number|null>} EtlOriginalRow
 */

/**
 * Một lỗi trong errorFiles.errors.
 * @typedef {Object} EtlErrorDetail
 * @property {string} field
 * @property {number} row
 * @property {string} message
 * @property {EtlOriginalRow} originalData
 * @property {string} _id
 */

/**
 * Một file có lỗi.
 * @typedef {Object} EtlErrorFile
 * @property {string} fileName
 * @property {string} stage
 * @property {number} totalErrors
 * @property {EtlErrorDetail[]} errors
 * @property {string} timestamp
 * @property {string} _id
 */

/**
 * Response tổng của job ETL.
 * @typedef {Object} EtlJobResponse
 * @property {boolean} success
 * @property {string} jobId
 * @property {'pending'|'processing'|'partial'|'completed'|'failed'} status
 * @property {string} message
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {EtlJobSummary} summary
 * @property {EtlSuccessFile[]} successFiles
 * @property {EtlErrorFile[]} errorFiles
 */

export {};
