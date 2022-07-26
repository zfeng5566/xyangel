import React, { useState } from 'react';
import { Input, Button, Card, Row, Col } from 'antd';
import { Form } from '@rjsf/antd';
import { editor } from 'monaco-editor';
import styles from './store.module.scss';

/* eslint-disable-next-line */
export interface StoreProps {}
const defaultCode = `
{
    "title": "A registration form",
    "description": "A simple form example.",
    "type": "object",
    "required": [
      "firstName",
      "lastName"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "title": "First name",
        "default": "Chuck"
      },
      "lastName": {
        "type": "string",
        "title": "Last name"
      },
      "telephone": {
        "type": "string",
        "title": "Telephone",
        "minLength": 10
      }
    }
  }

`;

export function Store(props: StoreProps) {
    const [code, setCode] = useState<string>(defaultCode);

    const divRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (divRef.current) {
            if (divRef.current.childNodes.length === 0) {
                const editorInstance = editor.create(divRef.current, {
                    value: defaultCode,
                    language: 'json',
                });

                editorInstance.onDidChangeModelContent((e) => {
                    const jsonValue = editorInstance.getValue();
                    try {
                        JSON.parse(jsonValue);
                        setCode(editorInstance.getValue());
                        // eslint-disable-next-line no-empty
                    } catch (error) {}
                });
            }
        }
    });

    return (
        <div className={styles['container']}>
            <div className="mt-5">
                <Card bordered={false} className="shadow-sm">
                    <Row className="justify-between">
                        <Col span={12}>
                            <Input placeholder="搜索......" />
                        </Col>
                        <Col>
                            <Button type="primary">创建新的多条</Button>
                            <Button type="primary">创建新的单条</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
            <div className="flex justify-start">
                <Card className="w-3/5">
                    <div className={styles['editor-wrap']} ref={divRef}></div>
                </Card>
                <Card bordered={false} className="shadow-md">
                    <Form schema={JSON.parse(code)} />
                </Card>
            </div>
        </div>
    );
}
