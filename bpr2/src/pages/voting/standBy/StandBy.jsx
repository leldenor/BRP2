import { useEffect, useState } from "react"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Container, Row, Col } from "react-bootstrap";

const StandBy = () => {

    return (
        <>
            <Container>
                <Row>
                    <Col style={{ paddingTop: "10vh" }}>
                        <div className="textBox">
                            <h2>Waiting for next question. Please enjoy the play on stage meanwhile!</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StandBy