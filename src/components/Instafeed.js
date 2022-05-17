import React, { useState, useEffect, useCallback } from 'react';
import Carousel from 'react-grid-carousel';
import { Card, Button, Page, Layout, DisplayText, Form, TextField, FormLayout, Select, TextStyle, Banner, Heading, Modal, TextContainer } from '@shopify/polaris';
import SearchBox from './ProductSearch';
const Instafeed = () => {
    const [data, setData] = useState({
        title: '',
        spacing: [
            { value: "0", label: "No Spacing" },
            { value: "10", label: "Small" },
            { value: "20", label: "Medium" },
            { value: "30", label: "Large" },
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
        row: '1',
        col: '1',
        selectedSpacing: '0',
        selectedClick: '',
        selectedlayout: '',
        isConnected: true,
    });
    const handleAction = (value, fieldName) => {
        setData({ ...data, [fieldName]: value });
    }
    const handleSecondButtonClick = () => {
        console.log("Check", data)
    }
   
    useEffect(() => {
        console.log("Working")
    });
    const [active, setActive] = useState(false);
    const [postActive, setpostActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);
    const postHandle = useCallback(() => setpostActive(!postActive), [postActive]);
    // const handlePopUp = useCallback(() => setActive(!active), [active]);
    const handlePopUp = (e) => {
        console.log("--------", e)
        setpostActive(!postActive);
        
    };
    
    const productmodalInstance = (
        <div style={{ height: "500px" }}>
            <Modal
                open={active}
                onClose={handleChange}
                title="Add Products"
                primaryAction={{
                    content: "Add",
                    onAction: handleChange
                }}
                secondaryActions={[
                    {
                        content: "Cancel",
                        onAction: handleChange
                    }
                ]}
            >
                <Modal.Section>
                    <SearchBox />
                </Modal.Section>
            </Modal>
        </div>
    )
    const postmodalInstance = (
        <div style={{ height: "500px" }}>
            <Modal
                open={postActive}
                onClose={postHandle}
            >
                <Modal.Section>
                    <p> IMAGE HERE</p>
                </Modal.Section>
            </Modal>
        </div>
    )

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
            <div className="form-section" style={{ display: data.isConnected ? 'block' : 'none' }}>
                <Layout>
                    <Layout.Section oneHalf>
                        <Card sectioned >
                            <Form>
                                <FormLayout>
                                    <TextField label="FEED TITLE" value={data.title} onChange={(value) => handleAction(value, 'title')} autoComplete="off" />
                                    <FormLayout.Group>
                                        {/* <Select
                                            label="POST SPACING"
                                            options={data.spacing}
                                            onChange={(value) => handleAction(value, 'selectedSpacing')}
                                            value={data.selectedSpacing}
                                        /> */}
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
                                            minLength={1}
                                            autoComplete="off"
                                        />
                                        <TextField type="number" inputMode="numeric" label="COLUMNS" value={data.col} onChange={(value) => handleAction(value, 'col')} autoComplete="off" minLength={1} maxLength={8}
                                        />
                                    </FormLayout.Group>
                                </FormLayout>
                                <div className="form-info">
                                    <TextStyle variation="positive">Subscribe our plans and have different rows/columns between desktop and mobile</TextStyle></div>
                                <div className="form-btn">
                                    <Button fullWidth primary onClick={handleSecondButtonClick} >save Feed</Button>
                                </div>
                                <div className="form-alert">
                                    <Banner title="Latest version" status="warning" >
                                        <p> Hit "Save Feed" to upgrade Instafeed to the latest version.</p>
                                    </Banner>
                                </div>
                            </Form>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card sectioned >
                            <div className="slider-sec">
                                <Heading id="slider-title" >{data.title}</Heading>
                                <Carousel cols={data.col} rows={data.row} gap={10} loop>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=1" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=2" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=3" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=1" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=2" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=3" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=1" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=2" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=3" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=1" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=2" onClick={handlePopUp} />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img width="100%" src="https://picsum.photos/800/600?random=3" onClick={handlePopUp} />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Card>
                    </Layout.Section>
                </Layout>
            </div>
            <div className="footer-section">
                <Layout>
                    <Layout.Section>
                        <Card title="Rate us on Shopify App Store" sectioned>
                            <p>Your feedback helps our app!</p>
                        </Card>
                    </Layout.Section>
                </Layout>
            </div>
            {productmodalInstance}
            {postmodalInstance}
        </Page>
    )
}
export default Instafeed;