import React from 'react';
import { Document, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import Logo from '../../img/logo.jpg';
import FooterImg from '../../img/footerimg.png';
import moment from 'moment';
import { config } from '../../config/config';

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

const RowEnd = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

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
const LeaveApplicationStaffPDF = ({ selectedApplication, applicationData, ceoCode, cooCode, hraManagerCode, projectManagerCode, immediateSuperiorCode, supervisorCommentL1,
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
        <Title style={{ borderTop: 1, borderBottom: 1, }}>STAFF LEAVE APPLICATION</Title>
        <Section>
          <Row>
            <Label1>Name:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 155, paddingLeft: 3 }}>
              { applicationData && applicationData.name !== "" ? applicationData.name : " "}
            </Input1>
            <Label1>Employee No.:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 63, paddingLeft: 3 }}>
              { applicationData && applicationData.employee_code !== "" ? applicationData.employee_code : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Nationality:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 138, paddingLeft: 3 }}>
              { applicationData && applicationData.nationality !== "" ? applicationData.nationality : " "}
            </Input1>
          </Row>
          <Row>
            <Label1>Department/Project:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 102, paddingLeft: 3 }}>
              { applicationData && applicationData.department !== "" ? applicationData.department : " "}
            </Input1>
            <Label1>Designation:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 70, paddingLeft: 3 }}>
              { applicationData && applicationData.designation !== "" ? applicationData.designation : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Country of Destination: </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 96, paddingLeft: 3 }}>
              { applicationData && applicationData.country_of_destination !== "" ? applicationData.country_of_destination : " "}
            </Input1>
          </Row>
          <Row>
            <Label1>Contact no. in Country of Destination:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 161, paddingLeft: 3 }}>
              { applicationData && applicationData.contact_country_destination !== "" ? applicationData.contact_country_destination : " "}
            </Input1>
            <Label1 style={{ marginLeft: 5 }}>Mobile No. in Qatar:   </Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 96, paddingLeft: 3, marginLeft: 7 }}>
              { applicationData && applicationData.mobile_no_qatar !== "" ? applicationData.mobile_no_qatar : " "}
            </Input1>
          </Row>
        </Section>
        <Section>
          <Text style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>
            Leave Type
          </Text>
        </Section>
        <Section>
          <Row>
            <View style={{ paddingLeft: 10 }}>
              <Row>
                <CheckBox>
                  {applicationData && applicationData.leave_type === 'Annual' ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>Annual</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 15 }}>
              <Row>
                <CheckBox>
                  {applicationData && applicationData.leave_type === 'Unpaid' ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>Unpaid</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 15 }}>
              <Row>
                <CheckBox>
                  {applicationData && applicationData.leave_type === 'Sick' ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>Sick</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 15 }}>
              <Row>
                <CheckBox>
                  {applicationData && applicationData.leave_type === 'Emergency' ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>Emergency(Condolence)</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 15 }}>
              <Row>
                <CheckBox>
                  {applicationData && applicationData.leave_type === 'Others' ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>Others:</CheckBoxLabel>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 95, paddingLeft: 3, marginLeft: 7 }}>
                  {applicationData && applicationData.other_leave !== "" ? applicationData.other_leave : " "}
                </Input1>
              </Row>
            </View>
          </Row>
        </Section>
        <Section>
          <Row>
            <View>
              <Row style={{ marginBottom: 0 }}>
                <Label1>Leave Starting Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 80, paddingLeft: 3, marginLeft: 7 }}>
                  {applicationData && applicationData.leave_starting_date !== "" ? moment(applicationData.leave_starting_date).format("MM/DD/YYYY") : " "}
                </Input1>
                <Label1 style={{ marginLeft: 175 }}>No. of days to:</Label1>
              </Row>
              <Row style={{ marginBottom: 0 }}>
                <Label1>Leave Ending Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 80, paddingLeft: 3, marginLeft: 10 }}>
                  {applicationData && applicationData.leave_ending_date !== "" ? moment(applicationData.leave_ending_date).format("MM/DD/YYYY") : " "}
                </Input1>
                <Label1>No. of days applied:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 90, paddingLeft: 3, marginLeft: 7 }}>
                  {applicationData && applicationData.no_of_days_applied !== "" ? applicationData.no_of_days_applied : " "}
                </Input1>
                <Label1>be encashed:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 99, paddingLeft: 3, marginLeft: 7 }}>
                  {applicationData && applicationData.no_of_days_to_encashed !== "" ? applicationData.no_of_days_to_encashed : " "}
                </Input1>
              </Row>
              <Row style={{ marginBottom: 0 }}>
                <Label1>Actual Travel Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 80, paddingLeft: 3, marginLeft: 14 }}>
                  {applicationData && applicationData.actual_travel_date !== "" ? moment(applicationData.actual_travel_date).format("MM/DD/YYYY") : " "}
                </Input1>
                <Label1>Preferred Airline:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 90, paddingLeft: 3, marginLeft: 18 }}>
                  {applicationData && applicationData.preferred_airlines !== "" ? applicationData.preferred_airlines : " "}
                </Input1>
              </Row>
            </View>
          </Row>
          <View style={{ fontSize: 7, marginLeft: 170 }}>
            <Text>
              Note: For Family ticket request, updated passport & RPs are required.
            </Text>
            <Text style={{ marginLeft: 19 }}>
              Fair difference between approved ticket & request will be charge on employee's account.
            </Text>
          </View>
          <Row>
            <View>
              <Row>
                <View>
                  <Label1>With Family Ticket:</Label1>
                  <Row style={{ marginLeft: 28 }}>
                    <CheckBox>
                      {applicationData && applicationData.with_wife ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Wife:</CheckBoxLabel>
                  </Row>
                </View>
                <View style={{ marginLeft: 28 }}>
                  <Label1>(if applicable)</Label1>
                  <Row>
                    <CheckBox>
                      {applicationData && applicationData.with_children ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Children:</CheckBoxLabel>
                  </Row>
                </View>
              </Row>
              <Row>
                <Label1>Dates From:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 55, paddingLeft: 3, marginLeft: 10 }}>
                  {applicationData && applicationData.dates_from !== "" ? moment(applicationData.dates_from).format("MM/DD/YYYY") : " "}
                </Input1>
                <Label1>to:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 55, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData && applicationData.dates_to !== "" ? moment(applicationData.dates_to).format("MM/DD/YYYY") : " "}
                </Input1>
              </Row>
              <Row>
                <Label1>Preferred Airline:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 108, paddingLeft: 3, marginLeft: 7 }}>
                  {applicationData && applicationData.family_preferred_airlines !== "" ? applicationData.family_preferred_airlines : " "}
                </Input1>
              </Row>
            </View>
            <View>
              <RowEnd>
                <View style={{ marginLeft: 10 }}>
                  {applicationData && applicationData.employee_code ?
                    <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginTop: 38 }}>
                      <Image source={`${config.baseURL}/fetch/signature?code=` + applicationData.employee_code} style={{width: 130, height: 20}}/>
                    </Text>
                    : 
                    <Text style={{ textAlign: "center", fontSize: 17, width: 100, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                  <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 170, paddingTop: "2px" }}>
                    Employee Signature
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginLeft: 5, marginTop: 50 }}>
                    {applicationData && applicationData.employee_signature_date !== "" ? applicationData.employee_signature_date : " "}
                  </Text>
                  <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 130, paddingTop: "2px" }}>
                    Date
                  </Text>
                </View>
              </RowEnd>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1 }}>Direct Approval</SubTitle>
        <Section>
          <Row>
            <View>
              <Label1>Supervisor:</Label1>
              <View>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 245, paddingLeft: 3}}>
                  {applicationData && applicationData.immediate_supervisor_commentL1 ? applicationData.immediate_supervisor_commentL1 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 245, paddingLeft: 3 }}>
                  {applicationData && applicationData.immediate_supervisor_commentL2 ? applicationData.immediate_supervisor_commentL2 : " "}
                </Input1>
              </View>
              <Row>
                <View>
                  {applicationData && applicationData.immediate_supervisor_signature ?
                    <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginTop: 5 }}>
                      <Image source={`${config.baseURL}/fetch/signature?code=` + immediateSuperiorCode} style={{width: 130, height: 20}}/>
                    </Text>
                    : 
                    <Text style={{ textAlign: "center", fontSize: 17, width: 100, marginLeft: 5, marginTop: 8, color: "white" }}>
                      Placeholder
                    </Text>
                  }
                  <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 155, paddingTop: "2px" }}>
                    Signature over printed name
                  </Text>
                </View>
                <View style={{ paddingLeft: 10, paddingTop: 9 }}>
                  <Text style={{ textAlign: "center", fontSize: 9, width: 80, marginTop: 8 }}>
                    {applicationData && applicationData.immediate_supervisor_sign_date !== "" ? moment(applicationData.immediate_supervisor_sign_date).format("MM/DD/YYYY") : " "}
                  </Text>
                  <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 80, paddingTop: "2px" }}>
                    Date
                  </Text>
                </View>
              </Row>
            </View>
            <View style={{ marginLeft: 13 }}>
              <Label1>Project Manager (If applicable):</Label1>
              <View>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 245, paddingLeft: 3 }}>
                  {applicationData && applicationData.project_manager_commentL1 ? applicationData.project_manager_commentL1 : " "}
                </Input1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 245, paddingLeft: 3 }}>
                  {applicationData && applicationData.project_manager_commentL2 ? applicationData.project_manager_commentL2 : " "}
                </Input1>
              </View>
              <Row>
                <View>
                  {applicationData && applicationData.project_manager_signature ?
                    <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginTop: 5 }}>
                      <Image source={`${config.baseURL}/fetch/signature?code=` + projectManagerCode} style={{width: 130, height: 20}}/>
                    </Text>
                    : 
                    <Text style={{ textAlign: "center", fontSize: 17, width: 100, marginLeft: 5, marginTop: 8, color: "white" }}>
                      Placeholder
                    </Text>
                  }
                  <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 155, paddingTop: "2px" }}>
                    Signature over printed name
                  </Text>
                </View>
                <View style={{ paddingLeft: 10, paddingTop: 9 }}>
                  <Text style={{ textAlign: "center", fontSize: 9, width: 80, marginTop: 8 }}>
                    {applicationData && applicationData.project_manager_sign_date !== "" ? moment(applicationData.project_manager_sign_date).format("MM/DD/YYYY") : " "}
                  </Text>
                  <Text style={{ textAlign: "center", borderTop: 1, fontSize: 9, width: 80, paddingTop: "2px" }}>
                    Date
                  </Text>
                </View>
              </Row>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1 }}>For BGC Human Resources Use Only</SubTitle>
        <Section>
          <Row style={{ marginBottom: 0, marginTop: 5 }}>
            <Label1 style={{ marginLeft: 0 }}>Previous Leave Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 137, paddingLeft: 3, marginLeft: 16 }}>
              { applicationData && applicationData.previous_leave_date !== "" ? moment(applicationData.previous_leave_date).format("MM/DD/YYYY") : " "}
            </Input1>
            <Label1 style={{ marginLeft: 32 }}>Joining Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 38 }}>
              { applicationData && applicationData.joining_date !== "" ? moment(applicationData.joining_date).format("MM/DD/YYYY") : " "}
            </Input1>
          </Row>
          <Row style={{ marginBottom: 0 }}>
            <Label1 style={{ marginLeft: 0 }}>Previous Leave Type:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 137, paddingLeft: 3, marginLeft: 16 }}>
              { applicationData && applicationData.previous_leave_type ? applicationData.previous_leave_type : " "}
            </Input1>
            <Label1 style={{ marginLeft: 32 }}>RP Expiry Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 27 }}>
              { applicationData && applicationData.rp_expiry_date !== "" ? moment(applicationData.rp_expiry_date).format("MM/DD/YYYY") : " "}
            </Input1>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Label1 style={{ marginLeft: 0 }}>Previous Annual Leave:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 137, paddingLeft: 3, marginLeft: 7 }}>
              { applicationData && applicationData.previous_annual_leave !== "" ? moment(applicationData.previous_annual_leave).format("MM/DD/YYYY") : " "}
            </Input1>
            <Label1 style={{ marginLeft: 32 }}>Passport Expiry Date:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 141, paddingLeft: 3, marginLeft: 4 }}>
              { applicationData && applicationData.passport_expiry_date !== "" ? moment(applicationData.passport_expiry_date).format("MM/DD/YYYY") : " "}            </Input1>
          </Row>
          <Text style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>
            ENTITLEMENTS:
          </Text>
          <Row>
            <Label1 style={{ marginLeft: 0 }}>Accrued Leave Days:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 137, paddingLeft: 3, marginLeft: 16 }}>
              { applicationData && applicationData.accrued_leave_days !== "" ? applicationData.accrued_leave_days : " "}
            </Input1>
            <Label1 style={{ marginLeft: 20 }}>Family Ticket Entitlement:</Label1>
            <View style={{ paddingLeft: 10 }}>
              <Row>
                <CheckBox>
                  { applicationData && applicationData.family_ticket_entitlement === "Yes" ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>Yes</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Row>
                <CheckBox>
                  { applicationData && applicationData.family_ticket_entitlement === "No" ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>No</CheckBoxLabel>
              </Row>
            </View>
          </Row>
          <Row>
            <Label1 style={{ marginLeft: 0 }}>Ticket Entitlement/Route:</Label1>
            <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 137, paddingLeft: 3, marginLeft: 1 }}>
              { applicationData && applicationData.ticket_entitlement_route !== "" ? applicationData.ticket_entitlement_route : " "}
            </Input1>
            <View style={{ paddingLeft: 10, marginLeft: 30 }}>
              <Row>
                <CheckBox>
                  { applicationData && applicationData.ticket_wife ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel style={{ marginLeft: 10 }}>Wife</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Row>
                <CheckBox>
                  { applicationData && applicationData.ticket_children ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel style={{ marginLeft: 10 }}>Children</CheckBoxLabel>
              </Row>
            </View>
          </Row>
          <Row style={{ marginTop: 2 }}>
            <Label1 style={{ marginLeft: 0 }}>Released:</Label1>
            <View style={{ paddingLeft: 10, marginLeft: 70 }}>
              <Row>
                <CheckBox>
                  { applicationData && applicationData.released === "Yes" ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>Yes</CheckBoxLabel>
              </Row>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Row>
                <CheckBox>
                  { applicationData && applicationData.released === "No" ? "X" : " "}
                </CheckBox>
                <CheckBoxLabel>No</CheckBoxLabel>
              </Row>
            </View>
          </Row>
        </Section>
        <SubTitle style={{ borderTop: 1, borderBottom: 1 }}>Management Approval</SubTitle>
        <Section>
          <Row>
            <View>
              <Text style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
                HRA Manager
              </Text>
              <Row style={{ marginBottom: 5 }}>
                <View>
                  <Row>
                    <CheckBox>
                      {applicationData && (applicationData.hra_approved !== "" && applicationData.hra_approved) ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Approved</CheckBoxLabel>
                  </Row>
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 20 }}>
                  <Row>
                    <CheckBox>
                      {applicationData && (applicationData.hra_approved === false && applicationData.hra_approved !== "") ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Disapproved</CheckBoxLabel>
                  </Row>
                </View>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0 }}>Remarks:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 5 }}>
                  { applicationData && applicationData.hra_remarks !== "" ? applicationData.hra_remarks : " "}
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0, marginTop: 17 }}>Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData && applicationData.hra_signature && hraManagerCode ?
                    <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginTop: 38 }}>
                      <Image source={`${config.baseURL}/fetch/signature?code=` + hraManagerCode} style={{width: 130, height: 20}}/>
                    </Text>
                    : 
                    <Text style={{ textAlign: "center", fontSize: 22, width: 100, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0 }}>Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 22 }}>
                  { applicationData && applicationData.hra_sign_date !== "" ? moment(applicationData.hra_sign_date).format("MM/DD/YYYY") : " "}
                </Input1>
              </Row>
            </View>
            <View>
              <Text style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
                Chief Operating Officer
              </Text>
              <Row style={{ marginBottom: 5 }}>
                <View>
                  <Row>
                    <CheckBox>
                      {applicationData && (applicationData.coo_approved !== "" && applicationData.coo_approved) ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Approved</CheckBoxLabel>
                  </Row>
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 20 }}>
                  <Row>
                    <CheckBox>
                      {applicationData && (applicationData.coo_approved === false && applicationData.coo_approved !== "") ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Disapproved</CheckBoxLabel>
                  </Row>
                </View>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0 }}>Remarks:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 5 }}>
                  { applicationData && applicationData.coo_remarks !== "" ? applicationData.coo_remarks : " "}
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0, marginTop: 17 }}>Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData && applicationData.coo_signature && cooCode ?
                    <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginTop: 38 }}>
                      <Image source={`${config.baseURL}/fetch/signature?code=` + cooCode} style={{width: 130, height: 20}}/>
                    </Text>
                    : 
                    <Text style={{ textAlign: "center", fontSize: 22, width: 100, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0 }}>Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 22 }}>
                  { applicationData && applicationData.coo_sign_date !== "" ? applicationData.coo_sign_date : " "}
                </Input1>
              </Row>
            </View>
            <View>
              <Text style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
                Chief Executive Officer
              </Text>
              <Row style={{ marginBottom: 5 }}>
                <View>
                  <Row>
                    <CheckBox>
                      {applicationData && (applicationData.ceo_approved !== "" && applicationData.ceo_approved) ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Approved</CheckBoxLabel>
                  </Row>
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 20 }}>
                  <Row>
                    <CheckBox>
                      {applicationData && (applicationData.ceo_approved === false && applicationData.ceo_approved !== "") ? "X" : " "}
                    </CheckBox>
                    <CheckBoxLabel>Disapproved</CheckBoxLabel>
                  </Row>
                </View>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0 }}>Remarks:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 5 }}>
                  { applicationData && applicationData.ceo_remarks !== "" ? applicationData.ceo_remarks : " "}
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0, marginTop: 16 }}>Signature:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 3 }}>
                  {applicationData && applicationData.ceo_signature && ceoCode ?
                    <Text style={{ textAlign: "center", fontSize: 9, width: 100, marginTop: 38 }}>
                      <Image source={`${config.baseURL}/fetch/signature?code=` + ceoCode} style={{width: 130, height: 20}}/>
                    </Text>
                    : 
                    <Text style={{ textAlign: "center", fontSize: 20, width: 100, marginLeft: "5px", color: "white" }}>
                      Placeholder
                    </Text>
                  }
                </Input1>
              </Row>
              <Row>
                <Label1 style={{ marginLeft: 0 }}>Date:</Label1>
                <Input1 style={{ borderBottom: 1, alignContent: 'center', width: 121, paddingLeft: 3, marginLeft: 22 }}>
                  { applicationData && applicationData.ceo_sign_date !== "" ? applicationData.ceo_sign_date : " "}
                </Input1>
              </Row>
            </View>
          </Row>
        </Section>
      </Border>
      <Footer
        fixed>
        BGC-F-HRM13B V3.0, 21/12/2019                        Page 1/1                                                    <Image src={FooterImg} style={{ width: 100, height: 20 }} fixed />
      </Footer>
    </Body>
  </Document>
);

export default LeaveApplicationStaffPDF;