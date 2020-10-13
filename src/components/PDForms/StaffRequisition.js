import React from "react";
import { Document, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import Logo from "../../img/logo.jpg";
import FooterImg from "../../img/footerimg.png";
import moment from "moment";

const styles = StyleSheet.create({
  image: { width: 130, height: 27 },
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "100%",
    width: "100%",
  },
});

const Body = styled.Page`
  padding-top: 35px;
  padding-bottom: 55px;
  padding-right: 35px;
  padding-left: 35px;
  border: 1px solid red;
`;

const Border = styled.View`
  border: 2px solid black;
`;

const Section = styled.View`
  padding: 8px;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

// const RowEnd = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `;

const Header = styled.Text`
  color: grey;
  font-size: 12px;
  //   margin-bottom: 20px;
  // height: 40px;
  padding: 5px;
`;

const Title = styled.Text`
  font-size: 12px;
  text-align: center;
  padding: 2px;
  background-color: #6da9e3;
  font-weight: bolder;
  text-transform: uppercase;
`;

const SubTitle = styled.Text`
  font-size: 11px;
  text-align: center;
  padding: 2px;
  background-color: #e0e0e0;
  text-transform: uppercase;
`;

const Label1 = styled.Text`
  font-size: 9px;
  // width: 110px;
  padding-top: 5px;
`;

// const Label2 = styled.Text`
//   font-size: 9px;
//   width: 65px;
//   padding-top: 5px;
// `;

const Input1 = styled.Text`
  // width: 210px;
  font-size: 9px;
  padding-top: 5px;
`;

// const Input2 = styled.Text`
//   width: 105px;
//   font-size: 9px;
//   padding-top: 5px;
// `;

// const Span = styled.Text`
//   font-size: 9px;
//   width: 80px;
//   text-align: center;
// `;

const CheckBox = styled.Text`
  width: 23px;
  font-size: 9px;
  height: 14px;
  padding-top: 2px;
  padding-left: 8px;
  border: 1px solid black;
`;

const CheckBoxLabel = styled.Text`
  font-size: 9px;
  padding-left: 3px;
  padding-top: 1px;
`;
// const Paragraph = styled.Text`
//   font-size: 9px;
// `;

const Footer = styled.Text`
  left: 35px;
  right: 35px;
  bottom: 25px;
  font-size: 11px;
  position: absolute;
  // text-align: center;
`;

// Create Document Component
const StaffRequisitionPDF = ({
  selectedApplication,
  applicationData,
  ceoCode,
  cooCode,
  hraManagerCode,
  projectManagerCode,
  immediateSuperiorCode,
  supervisorCommentL1,
  supervisorCommentL2,
  supervisorCommentL3,
  projectManagerCommentL1,
  projectManagerCommentL2,
  projectManagerCommentL3,
  ...props
}) => (
  <Document>
    <Body size="A4" wrap>
      <Border>
        <Header fixed>
          <Image src={Logo} style={styles.image} />
        </Header>
        <Title style={{ borderTop: 1, borderBottom: 1 }}>
          Staff Requisition
        </Title>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>
          General Background
        </SubTitle>
        <Section>
          <Row>
            <Label1>1. General Background</Label1>
          </Row>
          <Row>
            <Label1>Department/Project: </Label1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 250,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Date Request: </Label1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 107,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
          </Row>
          <Row>
            <Label1>Job Title: </Label1>
            <Input1
              style={{ alignContent: "center", width: 95, paddingLeft: 3 }}
            >
              " "
            </Input1>
          </Row>
          <Row>
            <Label1>Type of Request: </Label1>
          </Row>
          <Row>
            <Row style={{ paddingLeft: 70 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>New</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 70 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Replacement</CheckBoxLabel>
            </Row>
          </Row>
          <Label1>Reason for Requesting: </Label1>
          <View style={{ paddingLeft: 30 }}>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
              <Text
                style={{
                  textAlign: "center",
                  borderBottom: 1,
                  fontSize: 20,
                  width: 180,
                  marginLeft: "5px",
                  color: "white",
                }}
              >
                Placeholder
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                borderTop: 1,
                fontSize: 9,
                width: 180,
                paddingTop: "2px",
              }}
            >
              Requestor's Name & Signature
            </Text>
          </View>
        </Section>
        <Input1
          style={{
            borderBottom: 1,
            alignContent: "center",
            width: 521,
          }}
        />
        <View style={{ paddingLeft: 8, paddingBottom: 5 }}>
          <Row>
            <Label1>Resource Availability: </Label1>
          </Row>
          <Row style={{ paddingTop: 3 }}>
            <Row style={{ paddingLeft: 70 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Non Available</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 30 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Full Time</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 50 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Part Time</CheckBoxLabel>
            </Row>
          </Row>
        </View>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>
          Note and Justification by Immediate Supervisor/Manager
        </SubTitle>
        <Section style={{ paddingTop: 0 }}>
          <View style={{ paddingLeft: 30 }}>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Row>
              <View>
                <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottom: 1,
                      fontSize: 20,
                      width: 180,
                      marginLeft: "5px",
                      color: "white",
                    }}
                  >
                    Placeholder
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    borderTop: 1,
                    fontSize: 9,
                    width: 180,
                    paddingTop: "2px",
                  }}
                >
                  Name & Signature
                </Text>
              </View>
              <View style={{ paddingLeft: 123 }}>
                <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottom: 1,
                      fontSize: 20,
                      width: 180,
                      marginLeft: "5px",
                      color: "white",
                    }}
                  >
                    Placeholder
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    borderTop: 1,
                    fontSize: 9,
                    width: 150,
                    paddingTop: "2px",
                  }}
                >
                  Date
                </Text>
              </View>
            </Row>
          </View>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>
          Remarks by Currently Project Manager/Supervisor of Nominated Staff
        </SubTitle>
        <Section style={{ paddingTop: 0 }}>
          <View style={{ paddingLeft: 30 }}>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Row>
              <View>
                <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottom: 1,
                      fontSize: 20,
                      width: 180,
                      marginLeft: "5px",
                      color: "white",
                    }}
                  >
                    Placeholder
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    borderTop: 1,
                    fontSize: 9,
                    width: 180,
                    paddingTop: "2px",
                  }}
                >
                  Name & Signature
                </Text>
              </View>
              <View style={{ paddingLeft: 123 }}>
                <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottom: 1,
                      fontSize: 20,
                      width: 180,
                      marginLeft: "5px",
                      color: "white",
                    }}
                  >
                    Placeholder
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    borderTop: 1,
                    fontSize: 9,
                    width: 150,
                    paddingTop: "2px",
                  }}
                >
                  Date
                </Text>
              </View>
            </Row>
          </View>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1, marginTop: 5 }}>
          For BGC Human Resources Use Only
        </SubTitle>
        <Section>
          <Row style={{ paddingTop: 3 }}>
            <Label1>Recommendation: </Label1>
            <Row style={{ paddingLeft: 70 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Approved</CheckBoxLabel>
            </Row>
            <Row style={{ paddingLeft: 30 }}>
              <CheckBox></CheckBox>
              <CheckBoxLabel>Disapproved</CheckBoxLabel>
            </Row>
          </Row>
          <View style={{ paddingLeft: 30 }}>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Input1
              style={{
                borderBottom: 1,
                alignContent: "center",
                width: 473,
                paddingLeft: 3,
              }}
            >
              " "
            </Input1>
            <Row>
              <View>
                <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottom: 1,
                      fontSize: 20,
                      width: 180,
                      marginLeft: "5px",
                      color: "white",
                    }}
                  >
                    Placeholder
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    borderTop: 1,
                    fontSize: 9,
                    width: 180,
                    paddingTop: "2px",
                  }}
                >
                  HRA Manger
                </Text>
              </View>
              <View style={{ paddingLeft: 123 }}>
                <Text style={{ textAlign: "center", fontSize: 9, width: 200 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      borderBottom: 1,
                      fontSize: 20,
                      width: 180,
                      marginLeft: "5px",
                      color: "white",
                    }}
                  >
                    Placeholder
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    borderTop: 1,
                    fontSize: 9,
                    width: 150,
                    paddingTop: "2px",
                  }}
                >
                  Date
                </Text>
              </View>
            </Row>
          </View>
        </Section>
        <Input1
          style={{
            borderBottom: 1,
            alignContent: "center",
            width: 521,
          }}
        />
        <Section style={{ paddingTop: 0 }}>
          <Label1>Note: </Label1>
          <View style={{ paddingLeft: 30 }}>
            <Text style={{fontSize: 8}}>
              1. Immediate Supervisor should justify clearly on how to provice the required staff.
              Allocation for availability must met by all concern parties.
            </Text>
            <Text style={{fontSize: 8}}>
              2. Should filled out by the Project Manager who is currently working with the nominated staff
              when resource is available as per note by the Immediate Supervisor.
            </Text>
            <Text style={{fontSize: 8}}>
              3. The Recruitment Request Form will be filled out for non-available resource staff as per the approval by HRA Manager.
            </Text>
            <Text style={{fontSize: 8}}>
              4. The Commence Work Form will be filled out and secured during the 1st day of assigned resource staff.
            </Text>
          </View>
        </Section>
      </Border>
      <Footer
        fixed>
        BGC-F-HRM18 V2.0, 21/12/2019                        Page 1/1                                                    <Image src={FooterImg} style={{ width: 100, height: 20 }} fixed />
      </Footer>
    </Body>
  </Document>
);

export default StaffRequisitionPDF;
