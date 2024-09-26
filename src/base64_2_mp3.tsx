import {bitable, UIBuilder} from "@lark-base-open/js-sdk"

export default async function base64_2_mp3(
    ui_buildr: UIBuilder,
    table_id: string,
    base64_field_id: string,
    mp3_filed_id: string,
): Promise<any> {
    try {
        const table = await bitable.base.getTableById(table_id)
        const record_list = await table.getRecordList()
        for (const record of record_list) {
            try {
                const base64_cell = await record.getCellByField(base64_field_id)
                const base64_value_list = await base64_cell.getValue()
                const base64_value = await base64_value_list[0].text

                // 解码 Base64 字符串
                const binary_string = atob(base64_value);

                // 创建 Uint8Array 来存储二进制数据
                const binary_length = binary_string.length;
                const bytes = new Uint8Array(binary_length);

                for (let i = 0; i < binary_length; i++) {
                    bytes[i] = binary_string.charCodeAt(i);
                }

                // 创建 Blob 对象，指定 MIME 类型为 MP3
                const blob = new Blob([bytes], {type: 'audio/mpeg'});

                // 将 Blob 对象封装成 File 对象
                const file = new File([blob], `${mp3_filed_id}.mp3`, {type: 'audio/mpeg'});

                // 保存 MP3 文件到当前记录的附件字段中
                const mp3_cell = await record.getCellByField(mp3_filed_id)
                await mp3_cell.setValue(file)
            }
            catch (idx_error) {
                console.error(idx_error);
            }
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}