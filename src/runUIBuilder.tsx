//@ts-nocheck
import {bitable, FieldType, UIBuilder} from "@lark-base-open/js-sdk";
import base64_2_mp3 from './base64_2_mp3'

export default async function main(uiBuilder: UIBuilder, {t}) {
    uiBuilder.markdown(`
# Bae64 To MP3

将base64文本内容，转为mp3文件，保存在附件字段中
  `);
    uiBuilder.form((form) => ({
        formItems: [
            form.tableSelect('table', {label: '选择数据表'}),
            form.fieldSelect('base64_field', {
                label: '选择base64字段',
                sourceTable: 'table',
                filterByTypes: [FieldType.Text]
            }),
            form.fieldSelect('mp3_filed', {
                label: '选择mp3字段',
                sourceTable: 'table',
                filterByTypes: [FieldType.Attachment]
            }),
        ],
        buttons: ['确定', '取消'],
    }), async ({key, values}) => {
        console.log("Test")
        const {table, base64_field, mp3_filed} = values;
        if (key === '确定') {
            console.log("start")
            uiBuilder.markdown(`开始转换`)
            const table_id = table.id
            const base64_field_id = base64_field.id
            const mp3_filed_id = mp3_filed.id
            const result = await base64_2_mp3(uiBuilder, table_id, base64_field_id, mp3_filed_id)
            uiBuilder.markdown(`结束转换`)
        }
    });
}