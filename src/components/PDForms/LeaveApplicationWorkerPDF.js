import React from 'react';
import { Document, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import Logo from '../../img/logo.jpg';
import FooterImg from '../../img/footerimg.png';
import moment from 'moment';

const styles = StyleSheet.create({
  image: { width: 130, height: 27 },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
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
`

const Section = styled.View`
  padding: 8px;
`
const Row = styled.View`
  display: flex;
  flex-direction: row;
`

// const RowEnd = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `

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
  background-color: #E0E0E0;
  text-transform: uppercase;
`

const Label1 = styled.Text`
  font-size: 9px;
  // width: 110px;
  padding-top: 5px;
`

// const Label2 = styled.Text`
//   font-size: 9px;
//   width: 65px;
//   padding-top: 5px;
// `

const Input1 = styled.Text`
  // width: 210px;
  font-size: 9px;
  padding-top: 5px;
`

// const Input2 = styled.Text`
//   width: 105px;
//   font-size: 9px;
//   padding-top: 5px;
// `

// const Span = styled.Text`
//   font-size: 9px;
//   width: 80px;
//   text-align: center;
// `

const CheckBox = styled.Text`
  width: 23px;
  font-size: 9px;
  height: 14px;
  padding-top: 2px;
  padding-left: 8px;
  border: 1px solid black;
`

const CheckBoxLabel = styled.Text`
  font-size: 9px;
  padding-left: 3px;
  padding-top: 1px;
`
// const Paragraph = styled.Text`
//   font-size: 9px;
// `

const Footer = styled.Text`
  left: 35px;
  right: 35px;
  bottom: 25px;
  font-size: 11px;
  position: absolute;
  // text-align: center;
`;

// Create Document Component
const LeaveApplicationWorkerPDF = ({ selectedApplication, applicationData, ceoCode, cooCode, hraManagerCode, projectManagerCode, immediateSuperiorCode, supervisorCommentL1,
  supervisorCommentL2, supervisorCommentL3, projectManagerCommentL1, projectManagerCommentL2, projectManagerCommentL3, ...props }) => (
  <Document>
    <Body size="A4" wrap>
      <Border>
        <Header fixed>
          <Image
            src={Logo}
            style={styles.image}
          />
        </Header>
        <Title style={{ borderTop: 1, borderBottom: 1, }}>WORKER'S LEAVE APPLICATION</Title>
        <Section>
          <View style={{ marginBottom: 5, marginTop: 10 }}>
            <Row>
              <Label1>Name:</Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 155, paddingLeft: 3 }}>
                {applicationData.name === "" ? " " : applicationData.name}
              </Input1>
              <Label1>Employee No.:   </Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 63, paddingLeft: 3 }}>
                {applicationData.employee_code === "" ? " " : applicationData.employee_code}
              </Input1>
              <Label1 style={{ marginLeft: 5 }}>Nationality:   </Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3 }}>
                {applicationData.nationality === "" ? " " : applicationData.nationality}
              </Input1>
            </Row>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Row>
              <Label1>Department/Project:</Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 102, paddingLeft: 3 }}>
                {applicationData.department === "" ? " " : applicationData.department}
              </Input1>
              <Label1>Designation:   </Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 70, paddingLeft: 3 }}>
                {applicationData.designation === "" ? " " : applicationData.designation}
              </Input1>
              <Label1 style={{ marginLeft: 5 }}>Country of Destination: </Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 96, paddingLeft: 3 }}>
                {applicationData.country_of_destination === "" ? " " : applicationData.country_of_destination}
              </Input1>
            </Row>
          </View>
          <Row>
            <Label1>Contact no. in Country of Destination:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 161, paddingLeft: 3 }}>
              {applicationData.contact_country_destination === "" ? " " : applicationData.contact_country_destination}
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Designation:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 133, paddingLeft: 3 }}>
              {applicationData.destination === "" ? " " : applicationData.destination}
            </Input1>
          </Row>
        </Section>
        <Section style={{ marginTop: 8, marginBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>
            Leave Type
          </Text>
        </Section>
        <Section style={{ marginBottom: 5 }}>
          <Row style={{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0 }}>
            <View style={{ paddingLeft: 10 }}>
              <Row>
                <CheckBox>{applicationData.leave_type === 'Annual' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Annual</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Row>
                <CheckBox>{applicationData.leave_type === 'Unpaid' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Unpaid</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Row>
                <CheckBox>{applicationData.leave_type === 'Sick' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Sick</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Row>
                <CheckBox>{applicationData.leave_type === 'Emergency' ? "X" : " "}</CheckBox>
                <CheckBoxLabel>Emergency</CheckBoxLabel>
              </Row>
            </View>
          </Row>
        </Section>
        <Section>
          <Row>
            <View>
              <Row style={{ marginBottom: 5 }}>
                <Label1>Leave Starting Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 159, paddingLeft: 3, marginLeft: 4 }}>
                  {applicationData.leave_starting_date === "" ? " " : moment(applicationData.leave_starting_date).format("MM/DD/YYYY")}
                </Input1>
              </Row>
              <Row style={{ marginBottom: 5 }}>
                <Label1>Leave Ending Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 159, paddingLeft: 3, marginLeft: 7 }}>
                  {applicationData.leave_ending_date === "" ? " " : moment(applicationData.leave_ending_date).format("MM/DD/YYYY")}
                </Input1>
              </Row>
              <Row style={{ marginBottom: 5 }}>
                <Label1>No. of days Applied:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 159, paddingLeft: 3, marginLeft: 7 }}>
                  {applicationData.no_of_days_applied === "" ? " " : applicationData.no_of_days_applied}
                </Input1>
              </Row>
              <Row style={{ marginBottom: 5 }}>
                <Label1 style={{ paddingTop: 14 }}>Employee Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 159, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData.employee_signature ?
                    <View>
                      <Image source={"http://192.168.0.200:3000/fetch/signature?code=" + applicationData.employee_code} style={{width: 100,height: 17}}/>
                    </View>
                    :
                    <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 17, width: 100, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
              </Row>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Row style={{ marginBottom: 5 }}>
                <Label1>Actual Travel Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 159, paddingLeft: 3, marginLeft: 4 }}>
                  {applicationData.actual_travel_date === "" ? " " : moment(applicationData.actual_travel_date).format("MM/DD/YYYY")}
                </Input1>
              </Row>
              <Row style={{ marginBottom: 5 }}>
                <Label1>Destination:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 159, paddingLeft: 3, marginLeft: 31 }}>
                  {applicationData.destination === "" ? " " : applicationData.destination}
                </Input1>
              </Row>
            </View>
          </Row>
          <Row style={{ marginBottom: 5 }}>
            <Label1>Comment of Direct Supervisor:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 376, paddingLeft: 3, marginLeft: 3 }}>
              {applicationData.supervisor_commentL1 ? applicationData.supervisor_commentL1 : " "}
            </Input1>
          </Row>
          <View style={{ marginBottom: 5 }}>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 503, paddingLeft: 3 }}>
              {applicationData.supervisor_commentL2 ? applicationData.supervisor_commentL2 : " "}
            </Input1>
          </View>
          <Row style={{ marginBottom: 5 }}>
            <Label1 style={{ paddingTop: 14 }}>Signture of Direct Supervisor:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 122, paddingLeft: 3, marginLeft: 4 }}>
              {applicationData.supervisor_signature ?
                <View>
                  <Image source={"http://192.168.0.200:3000/fetch/signature?code=" + applicationData.immediate_supervisor} style={{width: 100,height: 17}}/>
                </View>
                :
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 17, width: 100, marginLeft: "5px", color: "white" }}>
                  Placeholder
                </Text>
              }
            </Input1>
            <Label1 style={{ marginLeft: 3, paddingTop: 14 }}>Signture of Project Manager:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 133, paddingLeft: 3, marginLeft: 9 }}>
              {applicationData.project_manager_signature ?
                <View>
                  <Image source={"http://192.168.0.200:3000/fetch/signature?code=" + applicationData.project_manager} style={{width: 100,height: 17}}/>
                </View>
                :
                <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 17, width: 100, marginLeft: "5px", color: "white" }}>
                  Placeholder
                </Text>
              }
            </Input1>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Label1>Submission Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 170, paddingLeft: 3, marginLeft: 4 }}>
              {applicationData.submission_date === "" ? " " : moment(applicationData.submission_date).format("MM/DD/YYYY")}
            </Input1>
            <Label1 style={{ marginLeft: 3 }}>Comment of Project Manager:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 131, paddingLeft: 3, marginLeft: 4 }}>
              {applicationData.project_manager_comment ? applicationData.project_manager_comment : " "}
            </Input1>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1 }}>For BGC Human Resources Use Only</SubTitle>
        <Section>
          <Row style={{ marginBottom: 5, marginTop: 5 }}>
            <Label1 style={{ marginLeft: 3 }}>Previous Leave Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 167, paddingLeft: 3, marginLeft: 13 }}>
              {applicationData.previous_leave_date === "" ? " " : moment(applicationData.previous_leave_date).format("MM/DD/YYYY")}
            </Input1>
            <Label1 style={{ marginLeft: 3 }}>Joining Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 38 }}>
              {applicationData.joining_date === "" ? " " : moment(applicationData.joining_date).format("MM/DD/YYYY")}
            </Input1>
          </Row>
          <Row style={{ marginBottom: 5 }}>
            <Label1 style={{ marginLeft: 3 }}>Previous Leave Type:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 167, paddingLeft: 3, marginLeft: 13 }}>
              {applicationData.previous_leave_type ? applicationData.previous_leave_type : " "}
            </Input1>
            <Label1 style={{ marginLeft: 3 }}>RP Expiry Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 27 }}>
              {applicationData.rp_expiry_date === "" ? " " : moment(applicationData.rp_expiry_date).format("MM/DD/YYYY")}
            </Input1>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Label1 style={{ marginLeft: 3 }}>Previous Annual Leave:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 167, paddingLeft: 3, marginLeft: 4 }}>
              {applicationData.previous_annual_leave === "" ? " " : moment(applicationData.previous_annual_leave).format("MM/DD/YYYY")}
            </Input1>
            <Label1 style={{ marginLeft: 3 }}>Passport Expiry Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 4 }}>
              {applicationData.passport_expiry_date === "" ? " " : moment(applicationData.passport_expiry_date).format("MM/DD/YYYY")}
            </Input1>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1 }}>Management Approval</SubTitle>
        <Section>
          <View style={{ marginBottom: 5, marginTop: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", textAlign: "center" }}>
              HRA Manager
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Row>
              <View>
                <Row>
                  <CheckBox>{applicationData.hra_approved === true ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Approved</CheckBoxLabel>
                </Row>
              </View>
              <View style={{ marginLeft: 100 }}>
                <Row>
                  <CheckBox>{applicationData.hra_approved === false ? "X" : " "}</CheckBox>
                  <CheckBoxLabel>Disapproved</CheckBoxLabel>
                </Row>
              </View>
            </Row>
          </View>
          <View>
            <Row style={{ marginTop: 10 }}>
              <Label1 style={{ marginLeft: 3 }}>Remarks:</Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 456, paddingLeft: 3, marginLeft: 5 }}>
                {applicationData.hra_remarksL1 ? applicationData.hra_remarksL1 : " "}
              </Input1>
            </Row>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 456, paddingLeft: 3, marginLeft: 47, marginTop: 12 }}>
              {applicationData.hra_remarksL2 ? applicationData.hra_remarksL2 : " "}
            </Input1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 456, paddingLeft: 3, marginLeft: 47, marginTop: 12 }}>
              {applicationData.hra_remarksL3 ? applicationData.hra_remarksL3 : " "}
            </Input1>
            <Row style={{ marginTop: 10, marginBottom: 15 }}>
              <Label1 style={{ marginLeft: 3, paddingTop: 14 }}>Signature:</Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 3 }}>
                {applicationData.hra_manager_signature ?
                  <View>
                    <Image source={"http://192.168.0.200:3000/fetch/signature?code=" + hraManagerCode} style={{width: 100,height: 17}}/>
                  </View>
                  :
                  <Text style={{ textAlign: "center", borderBottom: 1, fontSize: 17, width: 100, marginLeft: "5px", color: "white" }}>
                    Placeholder
                  </Text>
                }
              </Input1>
              <Label1 style={{ marginLeft: 149, paddingTop:14 }}>Date:</Label1>
              <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 3, paddingTop: 14 }}>
                {applicationData.hra_manager_signature_date === "" ? " " : moment(applicationData.hra_manager_signature_date).format("MM/DD/YYYY")}
              </Input1>
            </Row>
          </View>
        </Section>
      </Border>
      <Footer
        fixed>
        BGC-F-HRM13B V3.0, 21/12/2019                        Page 1/1                                                    <Image src={FooterImg} style={{ width: 100, height: 20 }} fixed />
      </Footer>
    </Body>
  </Document>
);

export default LeaveApplicationWorkerPDF;