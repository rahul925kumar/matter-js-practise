import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Page, Layout, DisplayText, Form, TextField, FormLayout, Select, TextStyle, Banner } from '@shopify/polaris';
const Instafeed = () => {
    const [selected, setSelected] = useState('');
    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const [data, setData] = useState({
        title: '',
        spacing: [
            { value: "0", label: "No Spacing" },
            { value: "1", label: "Small" },
            { value: "2", label: "Medium" },
            { value: "3", label: "Large" },
        ],
        on_click: [
            { value: "2", label: "Open Popup / Show Product" },
            { value: "1", label: "Go to Instagram" },
            { value: "0", label: "Do Nothing" },
        ],
        layout: [
            { value: "0", label: "Grid" },
            { value: "1", label: "Slider" },
        ],
        row: '0',
        col: '0',
        selectedSpacing: '',
        selectedClick: '',
        selectedlayout: '',
    });
    const handleAction = (value, fieldName) => {
        console.log("dfhlkdjf", value)
        setData({ ...data, [fieldName]: value });
    }
    return (
        <Page fullWidth>
            <Layout>
                <Layout.Section>
                    <Card sectioned >
                        <Button primary>Connect an Instagram Account</Button>
                        {/* <DisplayText size="small" strong>Connect your Instagram account here!</DisplayText> */}
                        <div className="head-btn">
                            <Button>Installation Guide</Button>
                            <Button>FAQ & Support</Button>
                        </div>
                    </Card>
                </Layout.Section>
            </Layout>
            <div className="form-section">
                <Layout>
                    <Layout.Section oneHalf>
                        <Card sectioned >
                            <Form>
                                <FormLayout>
                                    <TextField label="FEED TITLE" value={data.title} onChange={(value) => handleAction(value, 'title')} autoComplete="off" />
                                    <FormLayout.Group>

                                        <Select
                                            label="POST SPACING"
                                            options={data.spacing}
                                            onChange={(value) => handleAction(value, 'selectedSpacing')}
                                            value={data.selectedSpacing}
                                        />
                                        <Select
                                            label="ON POST CLICK"
                                            options={data.on_click}
                                            onChange={(value) => handleAction(value, 'selectedClick')}
                                            value={data.selectedClick}
                                        />
                                    </FormLayout.Group>
                                    <Select
                                        label="LAYOUT"
                                        options={data.layout}
                                        onChange={(value) => handleAction(value, 'selectedlayout')}
                                        value={data.selectedlayout}
                                    />
                                    <FormLayout.Group>
                                        <TextField
                                            type="number"
                                            label="ROWS"
                                            value={data.row}
                                            onChange={(value) => handleAction(value, 'row')}
                                            maxLength={30}
                                            autoComplete="off"
                                        />
                                        <TextField type="number" label="COLUMNS" value={data.col} onChange={(value) => handleAction(value, 'col')} autoComplete="off" maxLength={8}
                                        />
                                    </FormLayout.Group>
                                </FormLayout>
                                <TextStyle variation="positive">Subscribe our plans and have different rows/columns between desktop and mobile</TextStyle>
                                <Button fullWidth primary>save Feed</Button>
                                <Banner
                                    title="Latest version"
                                    status="warning"
                                >
                                    <p>
                                        Hit "Save Feed" to upgrade Instafeed to the latest version.
                                    </p>
                                </Banner>
                            </Form>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card sectioned >

                        </Card>
                    </Layout.Section>
                </Layout>
                <div className="footer-section">
                    <Layout>
                        <Layout.Section>
                            <Card title="Rate us on Shopify App Store" sectioned>
                                <p>Your feedback helps our app!</p>
                            </Card>
                        </Layout.Section>
                    </Layout>
                </div>
            </div>
        </Page>
    )
}
export default Instafeed;