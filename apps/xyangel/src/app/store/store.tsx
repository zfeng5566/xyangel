import React, { useState } from 'react';
import { Input, Button, Table, Card, Row, Col, Modal, Select } from 'antd';
import { FormProps } from '@rjsf/core';
import { Form } from '@rjsf/antd';
import { editor } from 'monaco-editor';
import { Attribute, attrTypeList } from '@xyangel/data/json-def';
import MonacoEditor from 'react-monaco-editor';
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

    const log = (str: string) => {
        console.log(str);
    };

    const divRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (divRef.current) {
            editor.create(divRef.current, {
                value: defaultCode,
                language: 'json',
            });
        }
    }, []);

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
