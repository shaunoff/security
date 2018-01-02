const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');

const { db, User, Story, Section, Control, Policy } = require('./server/db/models');

const numUsers = 100;
const numStories = 500;

const emails = chance.unique(chance.email, numUsers);

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  const id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randUser () {
  const gender = chance.gender();
  return User.build({
    name: [chance.first({gender: gender}), chance.last()].join(' '),
    photo: randPhoto(gender),
    phone: chance.phone(),
    email: emails.pop(),
    password: chance.word(),
    isAdmin: chance.weighted([true, false], [5, 95])
  });
}

function randTitle () {
  const numWords = chance.natural({
    min: 1,
    max: 8
  });
  return chance.sentence({words: numWords})
  .replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  })
  .slice(0, -1);
}

function randStory (createdUsers) {
  const user = chance.pick(createdUsers);
  const numPars = chance.natural({
    min: 3,
    max: 20
  });
  return Story.build({
    author_id: user.id,
    title: randTitle(),
    paragraphs: chance.n(chance.paragraph, numPars)
  });
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    name: 'Zeke Nierenberg',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/zeke-astronaut.png',
    phone: '(510) 295-5523',
    email: 'zeke@zeke.zeke',
    password: '123',
    isAdmin: false
  }));
  users.push(User.build({
    name: 'Omri Bernstein',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: '(781) 854-8854',
    email: 'omri@omri.omri',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    name: 'Kate Humphrey',
    photo: 'https://learndotresources.s3.amazonaws.com/workshop/59ea65d1badb1d0004bf4ca3/baby%20hippo.jpg',
    phone: '(555) 623-7878',
    email: 'kate@kate.kate',
    password: '7890',
    isAdmin: true
  }));
  return users;
}

function generateStories (createdUsers) {
  return doTimes(numStories, () => randStory(createdUsers));
}

function createUsers () {
  return Promise.map(generateUsers(), user => user.save());
}

function createStories (createdUsers) {
  return Promise.map(generateStories(createdUsers), story => story.save());
}

function seed () {
  return createUsers()
  .then(createdUsers => createStories(createdUsers));
}

const sectionArray =[
  {name: 'Access Control'},
  {name: 'Awareness and Training'},
  {name: 'Audit and Accountability'},
  {name: 'Configuration Management'},
  {name: 'Identification and Authentication'},
  {name: 'Incident Response'},
  {name: 'Maintenance'},
  {name: 'Media Protection'},
  {name: 'Personal Security'},
  {name: 'Physical Protection'},
  {name: 'Risk Assessment'},
  {name: 'Security Assessment'},
  {name: 'Systems and Communications Protection'},
  {name: 'System and Information Integrity'}
]

const controlArray = [

 {
   "controlNumber": "NIST 800-171 Control Number",
   "controlType": "Control Type",
   "controlFamily": "Control Family",
   "controlText": "Control Text",
   "controlResult": "Response",
   "responsibleParty": "Responsible Party: IT Operations, Security Office, and/or Data Custodian",
   "nistMapping": "NIST 800-53 Mapping",
   "isoMapping": "ISO 27002:2013 Mapping",
   "cisCritical": "Relevant 20 Critical Control",
   "dfarsCovered": "DFARS 7012 (2013) Covered"
 },
 {
   "controlNumber": "3.1.1",
   "controlType": "Basic",
   "controlFamily": "Access Control",
   "controlText": "Limit information system access to authorized users, processes acting on behalf of authorized users, or devices (including other information systems).",
   "controlResult": "Maintain list of authorized users defining their identity and associated role and sync with system, application and data layers. Account requests must be authorized before access is granted. ",
   "responsibleParty": "IT Operations, Data Custodian",
   "nistMapping": "AC-2, AC-3, AC-17",
   "isoMapping": "A.6.2.1, A.6.2.2, A.6.2.2, A.9.1.2, A.9.2.1, A.9.2.2, A.9.2.3, A.9.2.5, A.9.2.6, A.9.4.1, A.9.4.4, A.9.4.5, A.13.1.1, A.13.1.1, A.13.2.1, A.14.1.2, A.14.1.2, A.14.1.3, A.18.1.3",
   "cisCritical": "12, 13, 15, 16, 17, ",
   "dfarsCovered": "AC-2"
 },
 {
   "controlNumber": "3.1.2",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Limit information system access to the types of transactions and functions that authorized users are permitted to execute.",
   "controlResult": "Utilize access control lists (derived from 3.1.1) to limit access to applications and data based on role and/or identity. Log access as appropriate.",
   "responsibleParty": "IT Operations, Data Custodian",
   "nistMapping": "AC-2, AC-3, AC-17",
   "isoMapping": "A.6.2.1, A.6.2.2, A.6.2.2, A.9.1.2, A.9.2.1, A.9.2.2, A.9.2.3, A.9.2.5, A.9.2.6, A.9.4.1, A.9.4.4, A.9.4.5, A.13.1.1, A.13.1.1, A.13.2.1, A.14.1.2, A.14.1.2, A.14.1.3, A.18.1.3",
   "cisCritical": "12, 13, 15, 16, 17",
   "dfarsCovered": "AC-2"
 },
 {
   "controlNumber": "3.1.3",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Control the flow of CUI in accordance with approved authorizations.",
   "controlResult": "Provide architectual solutions to control the flow of system data. The solutions may include firewalls, proxies, encryption, and other security technologies.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-4",
   "isoMapping": "A.13.1.3, A.13.2.1, A.14.1.2, A.14.1.3",
   "cisCritical": "10, 11, 13, 17, 19",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.1.4",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Separate the duties of individuals to reduce the risk of malevolent activity without collusion.",
   "controlResult": "If a system user accesses data as well as maintains the system in someway, create separate accounts with approriate access levels to separate functions.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-5",
   "isoMapping": "A.6.1.2",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.5",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Employ the principle of least privilege, including for specific security functions and privileged accounts.",
   "controlResult": "Only grant enough privileges to a system user to allow them to sufficiently fulfill their job duties. 3.1.4 references account separation.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-6, AC-6(1), AC-6(5)",
   "isoMapping": "A.9.1.2, A.9.2.3, A.9.4.4, A.9.4.5",
   "cisCritical": "12, 15",
   "dfarsCovered": "AC-6"
 },
 {
   "controlNumber": "3.1.6",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Use non-privileged accounts or roles when accessing nonsecurity functions.",
   "controlResult": "Users with multiple accounts (as defined in 3.1.4 and 3.1.5) must logon with the least privileged account. Most likely, this will be enforced as a policy. REWORD. POLICY",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-6(2)",
   "isoMapping": "A.9.1.2, A.9.2.3, A.9.4.4, A.9.4.5",
   "cisCritical": "12, 15",
   "dfarsCovered": "no"
 },
 {
   "controlNumber": "3.1.7",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Prevent non-privileged users from executing privileged functions and audit the execution of such functions.",
   "controlResult": "Enable auditing of all privileged functions, and control access using access control lists based on identity or role.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-6(9), AC-6(10)",
   "isoMapping": "A.9.1.2, A.9.2.3, A.9.4.4, A.9.4.5",
   "cisCritical": "12, 15",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.8",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Limit unsuccessful logon attempts.",
   "controlResult": "Configure system to lock logon mechanism for a predetermined time and lock user account out of system after a predetermined number of invalid logon attempts.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-7",
   "isoMapping": "A.9.4.2",
   "cisCritical": "16",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.1.9",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Provide privacy and security notices consistent with applicable CUI rules.",
   "controlResult": "Logon screen should display appropriate notices.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-9",
   "isoMapping": "A.9.4.2",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.10",
   "controlType": "Basic",
   "controlFamily": "Access Control",
   "controlText": "Use session lock with pattern-hiding displays to prevent access/viewing of data after period of inactivity.",
   "controlResult": "Configure system to lock session after a predetermined time of inactivity. Allow user to lock session for temporary absence.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-11, AC-11(1)",
   "isoMapping": "A.11.2.8, A.11.2.9",
   "cisCritical": "16",
   "dfarsCovered": "AC-11(1)"
 },
 {
   "controlNumber": "3.1.11",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Terminate (automatically) a user session after a defined condition.",
   "controlResult": "Configure system to end a user session after a predetermined time based on duration and/or inactivity of session.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-12",
   "isoMapping": "None",
   "cisCritical": "16",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.12",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Monitor and control remote access sessions.",
   "controlResult": "Run network and system monitoring applications to monitor remote system access and log accordingly.  Control remote access by running only necessary applications, firewalling appropriately, and utilize end to end encryption with appropriate access (re 3.1.1)",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-17(1)",
   "isoMapping": "A.6.2.1, A.6.2.2, A.13.1.1, A.13.2.1, A.14.1.2",
   "cisCritical": "12, 13",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.13",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.",
   "controlResult": "Any application used to remotely access the system must use approved encryption methods.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-17(2)",
   "isoMapping": "A.6.2.1, A.6.2.2, A.13.1.1, A.13.2.1, A.14.1.2",
   "cisCritical": "12,13",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.1.14",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Route remote access via managed access control points.",
   "controlResult": "Remote access is by authorized methods only and is maintained by IT Operations.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-17(3)",
   "isoMapping": "A.6.2.1, A.6.2.2, A.13.1.1, A.13.2.1, A.14.1.2",
   "cisCritical": "12,13",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.15",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Authorize remote execution of privileged commands and remote access to security-relevant information.",
   "controlResult": "Remote access for privileged actions is only permitted for necessary operational functions.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-17(4)",
   "isoMapping": "A.6.2.1, A.6.2.2, A.13.1.1, A.13.2.1, A.14.1.2",
   "cisCritical": "12, 13 ",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.16",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Authorize wireless access prior to allowing such connections.",
   "controlResult": "Organization officials will authorize the use of wireless technologies and provide guidance on their use. Wireless network access will be restricted to the established guidelines, monitored, and controlled.",
   "responsibleParty": "Security Office, IT Operations",
   "nistMapping": "AC-18",
   "isoMapping": "A.6.2.1, A.13.1.1, A.13.2.1",
   "cisCritical": "7",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.17",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Protect wireless access using authentication and encryption.",
   "controlResult": "Wireless access will restricted to authorized users only and encrypted according to industry best practices.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-18(1)",
   "isoMapping": "A.6.2.1, A.13.1.1, A.13.2.1",
   "cisCritical": "7",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.1.18",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Control connection of mobile devices.",
   "controlResult": "Organization officials will establish guidelines for the use of mobile devices and restrict the operation of those devices to the guidelines. Usage will be monitored and controlled.",
   "responsibleParty": "Security Office, IT Operations",
   "nistMapping": "AC-19",
   "isoMapping": "A.6.2.1, A.11.2.6, A.13.2.1",
   "cisCritical": "7, 12",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.1.19",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Encrypt CUI on mobile devices.",
   "controlResult": "Mobile devices will be encrypted.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AC-19(5)",
   "isoMapping": "A.6.2.1, A.11.2.6, A.13.2.1",
   "cisCritical": "7, 12",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.1.20",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Verify and control/limit connections to and use of external information systems.",
   "controlResult": "Guidelines and restrictions will be placed on the use of personally owned or external system access. Only authorized individuals will be permitted external access and those systems must meet the security standards set out by the organization.",
   "responsibleParty": "Security Office",
   "nistMapping": "AC-20, AC-20(1)",
   "isoMapping": "A.11.2.6, A.13.1.1, A.13.2.1",
   "cisCritical": "13",
   "dfarsCovered": "Ac-20(1)"
 },
 {
   "controlNumber": "3.1.21",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Limit use of organizational portable storage devices on external information systems.",
   "controlResult": "Guidelines and restrictions will be placed on the use of portable storage devices.",
   "responsibleParty": "Security Office",
   "nistMapping": "AC-20(2)",
   "isoMapping": "A.11.2.6, A.13.1.1, A.13.2.1",
   "cisCritical": "13",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.1.22",
   "controlType": "Derived",
   "controlFamily": "Access Control",
   "controlText": "Control information posted or processed on publicly accessible information systems.",
   "controlResult": "Only authorized individuals will post information on publically accessible information systems. Authorized individuals will be trained to ensure that non-public information is not posted. Public information will be reviewed annually to ensure that non-public information is not posted.",
   "responsibleParty": "Security Office, IT Operations",
   "nistMapping": "AC-22",
   "isoMapping": "None",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.2.1",
   "controlType": "Basic",
   "controlFamily": "Awareness and Training",
   "controlText": "Ensure that managers, systems administrators, and users of organizational information systems are made aware of the security risks associated with their activities and of the applicable policies, standards, and procedures related to the security of organizational information systems.",
   "controlResult": "Users, managers, and system administrators of the information system will receive initial and annual training commensurate with their role and responsibilities.  The training will provide a basic understanding of the need for information security, applicable policies, standards, and procedures related to the security of the information system, as well as user actions to maintain security and respond to suspected security incidents.  The content will also address awareness of the need for operations security.",
   "responsibleParty": "Data Custodian, Security Office",
   "nistMapping": "AT-2, AT-3",
   "isoMapping": "A.7.2.2, A.12.2.1",
   "cisCritical": "9",
   "dfarsCovered": "AT-2"
 },
 {
   "controlNumber": "3.2.2",
   "controlType": "Basic",
   "controlFamily": "Awareness and Training",
   "controlText": "Ensure that organizational personnel are adequately trained to carry out their assigned information security-related duties and responsibilities.",
   "controlResult": "Personnel with security-related duties and responsibilities will receive initial and annual training on their specific operational, managerial, and technical roles and responsibilities covering physical, personnel, and technical safeguards and countermeasures.  Training will address required security controls related to environmental and physical security risks, as well as training on indications of potentially suspicious email or web communications, to include suspicious communications and other anomalous system behavior.",
   "responsibleParty": "Data Custodian, Security Office",
   "nistMapping": "AT-2, AT-3",
   "isoMapping": "A.7.2.2, A.12.2.1",
   "cisCritical": "9",
   "dfarsCovered": "AT-2"
 },
 {
   "controlNumber": "3.2.3",
   "controlType": "Derived",
   "controlFamily": "Awareness and Training",
   "controlText": "Provide security awareness training on recognizing and reporting potential indicators of insider threat.",
   "controlResult": "Users, managers, and administrators of the information system will receive annual training on potential indicators and possible precursors of insider threat, to include long-term job dissatisfaction, attempts to gain unauthorized accesss to information, unexplained access to financial resources, bullying or sexual harassment of fellow employees, workplace violence, and other serious violations of organizational policies, procedures, directives, rules, or practices.  Security training will include how to communicate employee and management concerns regarding potential indicators of insider threat in accordance with established organizational policies and procedures.",
   "responsibleParty": "Data Custodian, Security Office",
   "nistMapping": "AT-2(2)",
   "isoMapping": "A.7.2.2, A.12.2.1",
   "cisCritical": "9",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.3.1",
   "controlType": "Basic",
   "controlFamily": "Audit and Accountability",
   "controlText": "Create, protect, and retain information system audit records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful, unauthorized, or inappropriate information system activity.",
   "controlResult": "The organization creates, protects, retains information system audit records for between 30-days and 1-year (depending on data source and applicable regulations) in order to enable the monitoring, analysis, investigation, and reporting of unlawful, unauthorized, or inappropriate information system activity.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-2, AU-3, AU-3(1), AU-6, AU-12",
   "isoMapping": "A.12.4.1, A.12.4.3, A.16.1.2, A.16.1.4",
   "cisCritical": "14",
   "dfarsCovered": "AU-2, AU-3"
 },
 {
   "controlNumber": "3.3.2",
   "controlType": "Basic",
   "controlFamily": "Audit and Accountability",
   "controlText": "Ensure that the actions of individual information system users can be uniquely traced to those users so they can be held accountable for their actions.",
   "controlResult": "The organization correlates network activity to individual user information order to uniquely trace and hold accountable users responsible for unauthorized actions.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-2, AU-3, AU-3(1), AU-6, AU-12",
   "isoMapping": "A.12.4.1, A.12.4.3, A.16.1.2, A.16.1.4",
   "cisCritical": "14",
   "dfarsCovered": "AU-2, AU-3"
 },
 {
   "controlNumber": "3.3.3",
   "controlType": "Derived",
   "controlFamily": "Audit and Accountability",
   "controlText": "Review and update audited events.",
   "controlResult": "The organization reviews and updates audited events annually or in the event of substantial system changes or as needed, to ensure that the information system is capable of auditing the following events, to ensure coordination with other organizational entities requiring audit-related information, and provide a rational for why auditable events are deemed adequate to support security investigations.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-2(3)",
   "isoMapping": "None",
   "cisCritical": "14",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.3.4",
   "controlType": "Derived",
   "controlFamily": "Audit and Accountability",
   "controlText": "Alert in the event of an audit process failure.",
   "controlResult": "The information system alerts personnel with security responsibilities in the event of an audit processing failure, and maintains audit records on host servers until log delivery to central repositories can be re-established.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-5",
   "isoMapping": "None",
   "cisCritical": "14",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.3.5",
   "controlType": "Derived",
   "controlFamily": "Audit and Accountability",
   "controlText": "Use automated mechanisms to integrate and correlate audit review, analysis, and reporting processes for investigation and response to indications of inappropriate, suspicious, or unusual activity.",
   "controlResult": "The organization employs automated mechanisms across different repositories to integrate audit review, analysis, correlation, and reporting processes in order to support organizational processes for investigation and response to suspicious activities, as well as gain organization-wide situational awareness.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-6(1), AU-6(3)",
   "isoMapping": "A.12.4.1, A.16.1.2, A.16.1.4",
   "cisCritical": "14",
   "dfarsCovered": "AU-6(1)"
 },
 {
   "controlNumber": "3.3.6",
   "controlType": "Derived",
   "controlFamily": "Audit and Accountability",
   "controlText": "Provide audit reduction and report generation to support on-demand analysis and reporting.",
   "controlResult": "The information system's audit capability supports an audit reduction and report generation capability that supports on-demand audit review, analysis, and reporting requirements and after-the-fact security investigations; and does not alter the original content or time ordering of audit records.  The system provides the capability to process audit records for events based on a variety of unique fields, to include user identity, event type, location, times, dates, system resources, IP, or information object accessed.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-7",
   "isoMapping": "None",
   "cisCritical": "14",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.3.7",
   "controlType": "Derived",
   "controlFamily": "Audit and Accountability",
   "controlText": "Provide an information system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records.",
   "controlResult": "The information system uses internal system clocks to generate time stamps for audit records, and records time stamps that can be mapped to UTC; compares system clocks with authoritative NTP servers, and synchronizes system clocks when the time difference is greater than 1 second.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-8, AU-8(1)",
   "isoMapping": "A.12.4.4",
   "cisCritical": "14",
   "dfarsCovered": "AU-8"
 },
 {
   "controlNumber": "3.3.8",
   "controlType": "Derived",
   "controlFamily": "Audit and Accountability",
   "controlText": "Protect audit information and audit tools from unauthorized access, modification, and deletion.",
   "controlResult": "The information system protects audit information and audit tools from unauthorized access, modification, and deletion.",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-9",
   "isoMapping": "A.12.4.2, A.12.4.3, A.18.1.3",
   "cisCritical": "14",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.3.9",
   "controlType": "Derived",
   "controlFamily": "Audit and Accountability",
   "controlText": "Limit management of audit functionality to a subset of privileged users.",
   "controlResult": "The organization authorizes access to management of audit functionality to only authorized individuals with a designated audit responsibility",
   "responsibleParty": "IT Operations",
   "nistMapping": "AU-9(4)",
   "isoMapping": "A.12.4.2, A.12.4.3, A.18.1.3",
   "cisCritical": "14",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.4.1",
   "controlType": "Basic",
   "controlFamily": "Configuration Management",
   "controlText": "Establish and maintain baseline configurations and inventories of organizational information systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles.",
   "controlResult": "Baseline configurations will be developed, documented, and maintained for each information system type. Baseline configurations will include software versions and patch level, configuration parameters, network information including topologies, and communications with connected systems. Baseline configurations will be updated as needed to accomodate security risks or software changes. Baseline configurations will be developed and approved in conjunction with the CISO (or equivalent) and the information security owner. Deviations from baseline configurations will be documented.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-2, CM-6, CM-8, CM-8(1)",
   "isoMapping": "A.8.1.1, A.8.1.2",
   "cisCritical": "1, 2, 3, 7, 10, 11, 13,",
   "dfarsCovered": "CM-2, CM-6, CM-8"
 },
 {
   "controlNumber": "3.4.2",
   "controlType": "Basic",
   "controlFamily": "Configuration Management",
   "controlText": "Establish and enforce security configuration settings for information technology products employed in organizational information systems.",
   "controlResult": "Security settings will be included as part of baseline configurations. Security settings will reflect the most restrictive appropriate for compliance requirements. Changes or deviations to security settings will be documented.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-2, CM-6, CM-8, CM-8(1)",
   "isoMapping": "A.8.1.1, A.8.1.2",
   "cisCritical": "1, 2, 3, 7, 10, 11, 13",
   "dfarsCovered": "CM-2, CM-6, CM-8"
 },
 {
   "controlNumber": "3.4.3",
   "controlType": "Derived",
   "controlFamily": "Configuration Management",
   "controlText": "Track, review, approve/disapprove, and audit changes to information systems.",
   "controlResult": "Changes or deviations to information system security control configurations that affect compliance requirements will be reviewed and approved by a change advisory board. The changes will also be tracked and documented in an approved service management system (ITSM) or equivalent tracking service. Change control tracking will be audited annually.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-3",
   "isoMapping": "A.12.1.2, A.14.2.2, A.14.2.3, A.14.2.4",
   "cisCritical": "3, 10",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.4.4",
   "controlType": "Derived",
   "controlFamily": "Configuration Management",
   "controlText": "Analyze the security impact of changes prior to implementation.",
   "controlResult": "Changes or deviations that affect information system security controls pertaining to compliance requirments will be tested prior to implementation to test their effectiveness. Only those changes or deviations that continue to meet compliance requirements will be approved and implemented.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-4",
   "isoMapping": "A.14.2.3",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.4.5",
   "controlType": "Derived",
   "controlFamily": "Configuration Management",
   "controlText": "Define, document, approve, and enforce physical and logical access restrictions associated with changes to the information system.",
   "controlResult": "Only those individuals approved to make physical or logical changes on information systems will be allowed to do so. Authorized personnel will be approved and documented by the service owner and IT security. All change documentation will include the authorized personnel making the change.",
   "responsibleParty": "Security Office",
   "nistMapping": "CM-5",
   "isoMapping": "A.9.2.3, A.9.4.5, A.12.1.2, A.12.1.4, A.12.5.1",
   "cisCritical": "3, 10 ",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.4.6",
   "controlType": "Derived",
   "controlFamily": "Configuration Management",
   "controlText": "Employ the principle of least functionality by configuring the information system to provide only essential capabilities.",
   "controlResult": "Information systems will be configured to deliver one function per system where practical.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-7",
   "isoMapping": "A.12.5.1 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "3",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.4.7",
   "controlType": "Derived",
   "controlFamily": "Configuration Management",
   "controlText": "Restrict, disable, and prevent the use of nonessential programs, functions, ports, protocols, and services.",
   "controlResult": "Only those ports and protocols necessary to provide the service of the information system will be configured for that system. Applications and services not necessary to provide the service of the information system will not be configured or enabled. Systems services will be reviewed to determine what is essential for the function of that system.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-7(1), CM-7(2)",
   "isoMapping": "A.12.5.1 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "3",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.4.8",
   "controlType": "Derived",
   "controlFamily": "Configuration Management",
   "controlText": "Apply deny-by-exception (blacklist) policy to prevent the use of unauthorized software or deny-all, permit-by-exception (whitelisting) policy to allow the execution of authorized software.",
   "controlResult": "The information system will be configured to only allow authorized software to run. The system will be configured to disallow running unauthorized software. The controls for allowing or disallowing the running of software may include but is not limited to the use of firewalls to restrict port access and user operational controls.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-7(4), CM-7(5)",
   "isoMapping": "A.12.5.1 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "3",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.4.9",
   "controlType": "Derived",
   "controlFamily": "Configuration Management",
   "controlText": "Control and monitor user-installed software.",
   "controlResult": "User controls will be in place to prohibit the installation of unauthorized software. All software for information systems must be approved.",
   "responsibleParty": "IT Operations",
   "nistMapping": "CM-11",
   "isoMapping": "A.12.5.1, A.12.6.2",
   "cisCritical": "2, 3",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.5.1",
   "controlType": "Basic",
   "controlFamily": "Identification and Authentication",
   "controlText": "Identify information system users, processes acting on behalf of users, or devices.",
   "controlResult": "Systems will make use of institutionally assigned accounts for unique access by individual. Should service accounts be necessary for device or process authentication, the accounts will be created by the central identity management team and assigned to a member of the research team. Institutional and service accounts are managed centrally and deprovisioned automatically when an individual leaves.",
   "responsibleParty": "IT Operations",
   "nistMapping": "IA-2, IA-5",
   "isoMapping": "A.9.2.1, A.9.2.4, A.9.3.1, A.9.4.3",
   "cisCritical": "12, 16",
   "dfarsCovered": "IA-2"
 },
 {
   "controlNumber": "3.5.2",
   "controlType": "Basic",
   "controlFamily": "Identification and Authentication",
   "controlText": "Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access to organizational information systems.",
   "controlResult": "Per control 3.5.1, the accounts in use will be assigned and managed by the university's central identity management system. Accounts are provisioned as part of the established account creation process. Accounts are uniquely assigned to faculty, staff upon hire; students upon matriculation; or affiliates when sponsored by an authorized faculty or staff member. Access to data associated with the project is controlled through role-based authorization by the project's PI. Initial passwords are randomly generated strings provided via a password reset mechanism to each facutly, staff, student or affiliate. The password must be reset upon first use. All passwords are at least 8 characters, and require a mix of upper and lower case letters, numbers, and special characters. OPTIONAL: Access to the project data stored in (INSERT LOCATION) requires use of institutional multifactor authentication services. New faculty and staff receive their account and instructions for creating a password from HR during the hiring process. New students receive notification of their account via registered email with an activation link to set their initial password. Passwords may be reset by contacting the service desk and providing proof of identity, or using the online reset service using pre-defined challenge and response questions. Default passwords for information systems are changed before they are introduced to the network. Passwords are stored centrally in institutionally-managed authentication systems (LIST? - AD, Kerberos) and hashed using <INSERT HASHING ALGORITHM?>. Encrypted transmission of passwords is required.",
   "responsibleParty": "IT Operations, Security Office, Data Custodian",
   "nistMapping": "IA-2, IA-5",
   "isoMapping": "A.9.2.1, A.9.2.4, A.9.3.1, A.9.4.3",
   "cisCritical": "12, 16",
   "dfarsCovered": "IA-2"
 },
 {
   "controlNumber": "3.5.3",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.",
   "controlResult": "Any network access to servers and virtual machines hosting the project data requires multifactor authentication provided by <school name> regardless if the account is privileged or unprivileged.",
   "responsibleParty": "IT Operations, Security Office, Data Custodian",
   "nistMapping": "IA-2(1), IA-2(2), IA-2(3)",
   "isoMapping": "A.9.2.1",
   "cisCritical": "12, 16",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.5.4",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts.",
   "controlResult": "Only anti-replay authentication mechanisms will be used. The authentication front-end technologies include shibboleth, SSH, Microsoft remote desktop protocol, and <VENDOR> SSL VPN. Backend authentication mechanisms in use include Kerberos and Active Directory.",
   "responsibleParty": "IT Operations, Security Office, Data Custodian",
   "nistMapping": "IA-2(8), IA-2(9)",
   "isoMapping": "A.9.2.1",
   "cisCritical": "12, 16",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.5.5",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Prevent reuse of identifiers for a defined period.",
   "controlResult": "Per control 3.5.1, the accounts in use will be assigned and managed by the university's central identity management system. Accounts are provisioned as part of the established account creation process. Accounts are uniquely assigned to faculty, staff, students and affiliates (guests). Account identifiers are not reused.",
   "responsibleParty": "IT Operations",
   "nistMapping": "IA-4",
   "isoMapping": "A.9.2.1",
   "cisCritical": "12",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.5.6",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Disable identifiers after a defined period of inactivity.",
   "controlResult": "User accounts or identifiers associated with a project or contract covered by NIST 800-171 are monitored for inactivity. Account access to the in-scope systems after 90/180/365 days of inactivity.",
   "responsibleParty": "IT Operations, Security Office, Data Custodian",
   "nistMapping": "IA-4",
   "isoMapping": "A.9.2.1",
   "cisCritical": "12",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.5.7",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Enforce a minimum password complexity and change of characters when new passwords are created.",
   "controlResult": "Account passwords must be a minimum of 8 characters and a mix of upper/lower case, numbers and symbols.",
   "responsibleParty": "IT Operations",
   "nistMapping": "IA-5(1)",
   "isoMapping": "A.9.2.1, A.9.2.4, A.9.3.1, A.9.4.3",
   "cisCritical": "12, 16",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.5.8",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Prohibit password reuse for a specified number of generations.",
   "controlResult": "Passwords may not be re-used for <XX days>. OR\n \n Users may not re-use the same password when changing their password for at least XX changes.",
   "responsibleParty": "IT Operations",
   "nistMapping": "IA-5(1)",
   "isoMapping": "A.9.2.1, A.9.2.4, A.9.3.1, A.9.4.3",
   "cisCritical": "12, 16",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.5.9",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Allow temporary password use for system logons with an immediate change to a permanent password.",
   "controlResult": "New employees will receive an account and instructions for creating a password from HR during the hiring process. New students receive notification of their account via email with an activation link to set their initial password. Temporary password activation links are sent to validated faculty, staff and students should they require a password reset or change. Temporary passwords are only good to allow for a password reset.",
   "responsibleParty": "IT Operations",
   "nistMapping": "IA-5(1)",
   "isoMapping": "A.9.2.1, A.9.2.4, A.9.3.1, A.9.4.3",
   "cisCritical": "12, 16",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.5.10",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Store and transmit only encrypted representation of passwords.",
   "controlResult": "Passwords are not stored in reversible encryption form in any of our systems. Instead, they are stored as one-way hashes constructed from passwords. Specifically, passwords stored in the MIT Kerberos system make use of of AES256 keys generated using a hashing algorithm that starts with the user’s password and includes various salting data, which is then encrypted on disk in a master key. On the AD domain controllers, passwords are stored as NTLMv2 hashed passwords and associated Kerberos AES keys.",
   "responsibleParty": "IT Operations, Security Office, Data Custodian",
   "nistMapping": "IA-5(1)",
   "isoMapping": "A.9.2.1, A.9.2.4, A.9.3.1, A.9.4.3",
   "cisCritical": "12, 16",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.5.11",
   "controlType": "Derived",
   "controlFamily": "Identification and Authentication",
   "controlText": "Obscure feedback of authentication information.",
   "controlResult": "The most basic feedback control is never informing the user in an error message what part of the of the authentication transaction failed. In the case of shibboleth, for example, the error message is generic regardless of whether the userid was mistyped, the password was wrong, or (in the case of MFA) there was a problem with the MFA credential provided — the failure simply says that the credentials were invalid. Likewise, unsuccessful authentications at the Kerberos KDCs don’t distinguish between the “principal not found” and the “invalid key” case. LDAP-based authentication interfaces only return a “failure to bind” message from both the main LDAPs and the AD.",
   "responsibleParty": "IT Operations, Security Office, Data Custodian",
   "nistMapping": "IA-5(1)",
   "isoMapping": "A.9.2.1, A.9.2.4, A.9.3.1, A.9.4.3",
   "cisCritical": "12, 16",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.6.1",
   "controlType": "Basic",
   "controlFamily": "Incident Response",
   "controlText": "Establish an operational incident-handling capability for organizational information systems that includes adequate preparation, detection, analysis, containment, recovery, and user response activities.",
   "controlResult": "Develop an institutional incident response policy; specifically outline requirements for handling of incidents involvoing CUI.",
   "responsibleParty": "Security Office",
   "nistMapping": "IR-2, IR-4, IR-5, IR-6, IR-7",
   "isoMapping": "A.6.1.3, A.7.2.2 (ISO Control doesn't completely match NIST 800-53), A.16.1.2, A.16.1.4, A.16.1.5, A.16.1.6",
   "cisCritical": "18",
   "dfarsCovered": "IR-2, IR-4, IR-5, IR-6"
 },
 {
   "controlNumber": "3.6.2",
   "controlType": "Basic",
   "controlFamily": "Incident Response",
   "controlText": "Track, document, and report incidents to appropriate officials and/or authorities both internal and external to the organization.",
   "controlResult": "Develop an institutional incident response policy; specifically outline requirements for tracking and reporting of incidents involving CUI to appropriate officials.",
   "responsibleParty": "Security Office",
   "nistMapping": "IR-2, IR-4, IR-5, IR-6, IR-7",
   "isoMapping": "A.6.1.3, A.7.2.2 (ISO Control doesn't completely match NIST 800-53), A.16.1.2, A.16.1.4, A.16.1.5, A.16.1.6",
   "cisCritical": "18",
   "dfarsCovered": "IR-2, IR-4, IR-5, IR-6"
 },
 {
   "controlNumber": "3.6.3",
   "controlType": "Derived",
   "controlFamily": "Incident Response",
   "controlText": "Test the organizational incident response capability.",
   "controlResult": "Develop an institutional incident response policy; specifically outline requirements for regular testing and reviews/improvements to incident response capabilities.",
   "responsibleParty": "Security Office",
   "nistMapping": "IR-3, IR-3(2)",
   "isoMapping": "None",
   "cisCritical": "18",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.7.1",
   "controlType": "Basic",
   "controlFamily": "Maintenance",
   "controlText": "Perform maintenance on organizational information systems.",
   "controlResult": "All systems, devices, supporting systems for organizational information systems must be maintained according to manufacturer recommendations or organizationally defined schedules ",
   "responsibleParty": "IT Operations",
   "nistMapping": "MA-2, MA-3, MA-3(1), MA-3(2)",
   "isoMapping": "A.11.2.4, A.11.2.5 (ISO Controls don't completely match NIST 800-53)",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.7.2",
   "controlType": "Basic",
   "controlFamily": "Maintenance",
   "controlText": "Provide effective controls on the tools, techniques, mechanisms, and personnel used to conduct information system maintenance.",
   "controlResult": "Organizations will put in place controls that limit the tools, techniques, mechanisms and personnel that will be used to maintain information systems, devices, and supporting systems.  This can include a lists of authorized tools, authorized personnel, and authorized techniques and mechanisms.  Any such maintenance must occur within the context of other information systems controls in place.",
   "responsibleParty": "IT Operations",
   "nistMapping": "MA-2, MA-3, MA-3(1), MA-3(2)",
   "isoMapping": "A.11.2.4, A.11.2.5 (ISO Controls don't completely match NIST 800-53)",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.7.3",
   "controlType": "Derived",
   "controlFamily": "Maintenance",
   "controlText": "Ensure equipment removed for off-site maintenance is sanitized of any CUI.",
   "controlResult": "Any media that is removed from the premises for maintenance or disposal must be sanitized according to the organization's media sanitization policies.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MA-2",
   "isoMapping": "A.11.2.4, A.11.2.5 (ISO Controls don't completely match NIST 800-53)",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.7.4",
   "controlType": "Derived",
   "controlFamily": "Maintenance",
   "controlText": "Check media containing diagnostic and test programs for malicious code before the media are used in the information system.",
   "controlResult": "Any media that is provided by authorized maintenance personnel (and not normal Systems administrators/owners) for troubleshooting, diagnostics, or other maintenance must be run through an anti-virus/anti-malware program prior to use in an organizational information system.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MA-3(2)",
   "isoMapping": "None",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.7.5",
   "controlType": "Derived",
   "controlFamily": "Maintenance",
   "controlText": "Require multifactor authentication to establish nonlocal maintenance sessions via external network connections and terminate such connections when nonlocal maintenance is complete.",
   "controlResult": "All remote access to an information system for maintenance or diagnostics must occur via an approved remote solution using multi-factor authentication.  A remote session must be disconnected when maintenance is complete",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MA-4",
   "isoMapping": "None",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.7.6",
   "controlType": "Derived",
   "controlFamily": "Maintenance",
   "controlText": "Supervise the maintenance activities of maintenance personnel without required access authorization.",
   "controlResult": "All activities of maintenance personnel who do not normally have access to a system must be monitored.  The organization will define approved methods for supervision.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MA-5",
   "isoMapping": "None",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.8.1",
   "controlType": "Basic",
   "controlFamily": "Media Protection",
   "controlText": "Protect (i.e., physically control and securely store) information system media containing CUI, both paper and digital.",
   "controlResult": "Responsible parties for data in these systems will document and ensure proper authorization controls for data in media and print.  Documented workflow, data access contols and media policy will be enforced to ensure proper access controls.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MP-2, MP-4, MP-6",
   "isoMapping": "A.8.2.3, A.8.3.1, A.8.3.2, A.11.2.7, A.11.2.9",
   "cisCritical": "8",
   "dfarsCovered": "MP-4, MP-6"
 },
 {
   "controlNumber": "3.8.2",
   "controlType": "Basic",
   "controlFamily": "Media Protection",
   "controlText": "Limit access to CUI on information system media to authorized users.",
   "controlResult": "All CUI systems will be managed under least access rules.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MP-2, MP-4, MP-6",
   "isoMapping": "A.8.2.3, A.8.3.1, A.8.3.2, A.11.2.7, A.11.2.9",
   "cisCritical": "8",
   "dfarsCovered": "MP-4, MP-6"
 },
 {
   "controlNumber": "3.8.3",
   "controlType": "Basic",
   "controlFamily": "Media Protection",
   "controlText": "Sanitize or destroy information system media containing CUI before disposal or release for reuse.",
   "controlResult": "All managed data storage will be erased, encrypted or destroyed using mechanisms with sufficient power to ensure that no usable data is retrievable from storage devices identified in the workflow of these systems/services.",
   "responsibleParty": "",
   "nistMapping": "MP-2, MP-4, MP-6",
   "isoMapping": "A.8.2.3, A.8.3.1, A.8.3.2, A.11.2.7, A.11.2.9",
   "cisCritical": "8",
   "dfarsCovered": "MP-4, MP-6"
 },
 {
   "controlNumber": "3.8.4",
   "controlType": "Derived",
   "controlFamily": "Media Protection",
   "controlText": "Mark media with necessary CUI markings and distribution limitations.",
   "controlResult": "All CUI system will be identified with an asset control identifier",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MP-3",
   "isoMapping": "A.8.2.2",
   "cisCritical": "15",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.8.5",
   "controlType": "Derived",
   "controlFamily": "Media Protection",
   "controlText": "Control access to media containing CUI and maintain accountability for media during transport outside of controlled areas.",
   "controlResult": "Only approved individuals are to have access to media from CUI systems.  Chain of evidence will be maintained for any media removed from these systems.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MP-5",
   "isoMapping": "A.8.2.3, A.8.3.1, A.8.3.3, A.11.2.5, A.11.2.6",
   "cisCritical": "15",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.8.6",
   "controlType": "Derived",
   "controlFamily": "Media Protection",
   "controlText": "Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards.",
   "controlResult": "All CUI data on media will be encrypted or physically locked prior to transport outside of the institutions secure locations.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MP-5(4)",
   "isoMapping": "A.8.2.3, A.8.3.1, A.8.3.3, A.11.2.5, A.11.2.6",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.8.7",
   "controlType": "Derived",
   "controlFamily": "Media Protection",
   "controlText": "Control the use of removable media on information system components.",
   "controlResult": "Removable media will only be allowed if there are processes in place to control them. Removable media must be able to support physical encryption and key vaulting must be utilized to ensure recoverabliity",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MP-7",
   "isoMapping": "A.8.2.3, A.8.3.1",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.8.8",
   "controlType": "Derived",
   "controlFamily": "Media Protection",
   "controlText": "Prohibit the use of portable storage devices when such devices have no identifiable owner.",
   "controlResult": "Only approved portable storage devices under asset management are to be used to store CUI data.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "MP-7(1)",
   "isoMapping": "A.8.2.3, A.8.3.1",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.8.9",
   "controlType": "Derived",
   "controlFamily": "Media Protection",
   "controlText": "Protect the confidentiality of backup CUI at storage locations.",
   "controlResult": "Data backups will be encrypted on media before removal from a secured facility",
   "responsibleParty": "Data Custodian",
   "nistMapping": "CP-9",
   "isoMapping": "A.12.3.1, A.17.1.2, A.18.1.3",
   "cisCritical": "8",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.9.1",
   "controlType": "Basic",
   "controlFamily": "Personnel Security",
   "controlText": "Screen individuals prior to authorizing access to information systems containing CUI.",
   "controlResult": "The organization will screen individuals prior to authorizing access to the information system, in accordance with applicable federal laws, Executive Orders, directives, regulations, policies, standards, guidance, and specific criteria established for the risk designations of assigned positions.  Criteria may include, for example, position sensitivity background screening requirements.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "PS-3, PS-4, PS-5",
   "isoMapping": "A.7.1.1, A.7.3.1, A.8.1.4",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.9.2",
   "controlType": "Basic",
   "controlFamily": "Personnel Security",
   "controlText": "Ensure that CUI and information systems containing CUI are protected during and after personnel actions such as terminations and transfers.",
   "controlResult": "The organzation will disable information system accesss prior to individual termination or transfer.  Within 24 hours of termination or transfer, the organization will revoke any authenticators/credentials associated with the individual, retrieve all organizational information system-related property from the individual, retain access to organizational information and information systems formerly controlled by the individual, and notify the information security office and data owner of the change in authorization.",
   "responsibleParty": "Data Custodian",
   "nistMapping": "PS-3, PS-4, PS-5",
   "isoMapping": "A.7.1.1, A.7.3.1, A.8.1.4",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.10.1",
   "controlType": "Basic",
   "controlFamily": "Physical Protection",
   "controlText": "Limit physical access to organizational information systems, equipment, and the respective operating environments to authorized individuals.",
   "controlResult": "The Area/Building Manager will desginate building areas as \"sensitve\" and design physical security protections (including guards, locks, cameras, card readers, etc) as necessary to limit physical access to the area to only authorized individuals.  Output devices such as printers should be placed in areas where their use does not expose data to unauthorized individuals.",
   "responsibleParty": "IT Operations",
   "nistMapping": "PE-2, PE-5, PE-6",
   "isoMapping": "A.11.1.2, A.11.1.3",
   "cisCritical": "",
   "dfarsCovered": "PE-2, PE-5"
 },
 {
   "controlNumber": "3.10.2",
   "controlType": "Basic",
   "controlFamily": "Physical Protection",
   "controlText": "Protect and monitor the physical facility and support infrastructure for those information systems.",
   "controlResult": "The Area/Building Manager will review the location and type of physical security in use (including guards, locks, card readers, etc) and evaluate its suitability for the organization's needs.",
   "responsibleParty": "IT Operations",
   "nistMapping": "PE-2, PE-5, PE-6",
   "isoMapping": "A.11.1.2, A.11.1.3",
   "cisCritical": "",
   "dfarsCovered": "PE-2, PE-5"
 },
 {
   "controlNumber": "3.10.3",
   "controlType": "Derived",
   "controlFamily": "Physical Protection",
   "controlText": "Escort visitors and monitor visitor activity.",
   "controlResult": "All visitors to sensitive areas will be escorted by an authorized employee at all times.",
   "responsibleParty": "IT Operations",
   "nistMapping": "PE-3",
   "isoMapping": "A.11.1.1, A.11.1.2, A.11.1.3",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.10.4",
   "controlType": "Derived",
   "controlFamily": "Physical Protection",
   "controlText": "Maintain audit logs of physical access.",
   "controlResult": "Logs of physical access to sensitive areas are maintained according to retention policies.  This includes authorized access as well as visitor access.",
   "responsibleParty": "IT Operations",
   "nistMapping": "PE-3",
   "isoMapping": "A.11.1.1, A.11.1.2, A.11.1.3",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.10.5",
   "controlType": "Derived",
   "controlFamily": "Physical Protection",
   "controlText": "Control and manage physical access devices.",
   "controlResult": "Physical access devices (such as card readers, proximity readers, and locks) will be maintained and operated according to the manufacturer recommendations.  These devices will be updated with any changed access control information as necessary to prevent unauthorized access.   The Area/Building Manager will review the location and type of each physical access device and evaluate its suitability for the organization's needs.",
   "responsibleParty": "IT Operations",
   "nistMapping": "PE-3",
   "isoMapping": "A.11.1.1, A.11.1.2, A.11.1.3",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.10.6",
   "controlType": "Derived",
   "controlFamily": "Physical Protection",
   "controlText": "Enforce safeguarding measures for CUI at alternate work sites (e.g., telework sites).",
   "controlResult": "All alternate sites where sensitive data is stored or processed must meet the same physical security requirements as the main site.",
   "responsibleParty": "IT Operations",
   "nistMapping": "PE-17",
   "isoMapping": "A.6.2.2, A.11.2.6, A.13.2.1",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.11.1",
   "controlType": "Basic",
   "controlFamily": "Risk Assessment",
   "controlText": "Periodically assess the risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals, resulting from the operation of organizational information systems and the associated processing, storage, or transmission of CUI.",
   "controlResult": "The stewards of the system/services will provide an initial and periodic risk assessment.  The assessments will be impact scrored using FIPS 199.  Changes in the environment that may affect the system or service, changes in use of or infrastructure will be documented and assessed as modified.  The impact analysis is to be a living document and incorporated into a larger risk assessment profile for the system/service.",
   "responsibleParty": "Data Custodian, Security Office",
   "nistMapping": "RA-3",
   "isoMapping": "A.12.6.1 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.11.2",
   "controlType": "Derived",
   "controlFamily": "Risk Assessment",
   "controlText": "Scan for vulnerabilities in the information system and applications periodically and when new vulnerabilities affecting the system are identified.",
   "controlResult": "Systems will be periodically scanned for common and new vulnerabilities.  Any vulnerability not documented will be risk assessed and documented.  Reports regarding the scans will be made available to system stewards and owners in a timely manner.  ",
   "responsibleParty": "Security Office",
   "nistMapping": "RA-5, RA-5(5)",
   "isoMapping": "A.12.6.1 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "3",
   "dfarsCovered": "RA-5"
 },
 {
   "controlNumber": "3.11.3",
   "controlType": "Derived",
   "controlFamily": "Risk Assessment",
   "controlText": "Remediate vulnerabilities in accordance with assessments of risk.",
   "controlResult": "Stewards and owners upon recognition of any vulnerablity will provide an action plan for remediation, acceptance, aversion or transferance of the vulnerability risk including a reasonable time frame for implementation.  All high vulnerabilities will be prioritized.",
   "responsibleParty": "Data Custodian, IT Operations",
   "nistMapping": "RA-5",
   "isoMapping": "A.12.6.1 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "3",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.12.1",
   "controlType": "Basic",
   "controlFamily": "Security Assessment",
   "controlText": "Periodically assess the security controls in organizational information systems to determine if the controls are effective in their application.",
   "controlResult": "An annual security assessment will be conducted to ensure that security controls are implemented correctly and meet the security requirements for the compliance environment. The assessment scope includes all information systems and networks in or directly connected to the compliance environment and all security controls and procedures necessary to meet the compliance requirements of the environment. The assessment will include, but is not limited to, vulnerability scanning, penetration testing, security control testing and reviews, configuration testing and reviews, log reviews, and personnel interviews. A representative sampling of systems will be assessed. Information Security, or an independent security auditor, will conduct the assessment. A final written assessment report and findings will be provided to the CIO at the conclusion of the assessment.",
   "responsibleParty": "Security Office",
   "nistMapping": "CA-2, CA-5, CA-7",
   "isoMapping": "A.14.2.8, A.18.2.2, A.18.2.3 (for CA-2 only)",
   "cisCritical": "1, 2, 3, 4, 5, 7, 10, 11, 12, 13, 14, 15, 17,  20",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.12.2",
   "controlType": "Basic",
   "controlFamily": "Security Assessment",
   "controlText": "Develop and implement plans of action designed to correct deficiencies and reduce or eliminate vulnerabilities in organizational information systems.",
   "controlResult": "An action plan to remediate identified weaknesses or deficiencies will be maintained. The action plan will designate remediation dates and milestones for each item. Definiciencies and weaknesses identified in security controls assessments, security impact analyses, and\ncontinuous monitoring activities will be added to the action plan within 30 days of the findings being reported.",
   "responsibleParty": "Security Office",
   "nistMapping": "CA-2, CA-5, CA-7",
   "isoMapping": "A.14.2.8, A.18.2.2, A.18.2.3 (for CA-2 only)",
   "cisCritical": "1, 2, 3, 4, 5, 7, 10, 11, 12, 13, 14, 15, 17,  20",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.12.3",
   "controlType": "Basic",
   "controlFamily": "Security Assessment",
   "controlText": "Monitor information system security controls on an ongoing basis to ensure the continued effectiveness of the controls.",
   "controlResult": "Continuous monitoring tools will be deployed for front Internet facing systems or those used to store or transmit sensitive data. At a minimum, systems will be monitored for privileged access, permission changes, kernel modifications, and binary changes, against a control and system baseline. Continuous monitoring reports and alerts will be reviewed daily. Unauthorized changes or unauthorized access will be reported to the CISO and information system owner within 24 hours of it being reported.",
   "responsibleParty": "Security Office",
   "nistMapping": "CA-2, CA-5, CA-7",
   "isoMapping": "A.14.2.8, A.18.2.2, A.18.2.3 (for CA-2 only)",
   "cisCritical": "1, 2, 3, 4, 5, 7, 10, 11, 12, 13, 14, 15, 17, 20",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.1",
   "controlType": "Basic",
   "controlFamily": "System and Communications Protection",
   "controlText": "Monitor, control, and protect organizational communications (i.e., information transmitted or received by organizational information systems) at the external boundaries and key internal boundaries of the information systems.",
   "controlResult": "Enumerate policies for managed interfaces such as gateways, routers, firewalls, VPNs; organizational DMZs; and restricting external web traffic to only designated servers.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-7, SA-8",
   "isoMapping": "A.8.2.3, A.13.1.1, A.13.1.3, A.13.2.1, A.13.2.3, A.14.1.2, A.14.1.3",
   "cisCritical": "13, 19",
   "dfarsCovered": "SC-7"
 },
 {
   "controlNumber": "3.13.2",
   "controlType": "Basic",
   "controlFamily": "System and Communications Protection",
   "controlText": "Employ architectural designs, software development techniques, and systems engineering principles that promote effective information security within organizational information systems.",
   "controlResult": "Outline organizational information security policies, to include standards for architectural design, software development, and system engineering principles designed to promote information security.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-7, SA-8",
   "isoMapping": "A.13.1.1, A.13.1.3, A.13.2.1, A.14.1.3, A.14.2.5",
   "cisCritical": "13, 19",
   "dfarsCovered": "SC-7"
 },
 {
   "controlNumber": "3.13.3",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Separate user functionality from information system management functionality.",
   "controlResult": "Enumerate the physical or logical controls used to separate user functionality from system management-related functionality (e.g., to ensure that administration (e.g. privilege) options are not available to general users).",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-2",
   "isoMapping": "None",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.13.4",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Prevent unauthorized and unintended information transfer via shared system resources.",
   "controlResult": "Enumerate the controls implemented to prevent object reuse and to protect residual information.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-4",
   "isoMapping": "None",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.13.5",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.",
   "controlResult": "Outline the policies for organizational DMZs.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-7, SA-8",
   "isoMapping": "A.13.1.1, A.13.1.3, A.13.2.1, A.14.1.3, A.14.2.5",
   "cisCritical": "13, 19",
   "dfarsCovered": "SC-7"
 },
 {
   "controlNumber": "3.13.6",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception).",
   "controlResult": "Document all business need exceptions to network communications traffic (inbound/outbound) “deny all” policies.",
   "responsibleParty": "Security Office",
   "nistMapping": "SC-7(5)",
   "isoMapping": "A.13.1.1, A.13.1.3, A.13.2.1, A.14.1.3",
   "cisCritical": "13, 19",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.7",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Prevent remote devices from simultaneously establishing non-remote connections with the information system and communicating via some other connection to resources in external networks.",
   "controlResult": "Outline controls to prevent split tunneling in remote devices, and to mandate VPN use when necessary for business functions.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-7(7)",
   "isoMapping": "A.13.1.1, A.13.1.3, A.13.2.1, A.14.1.3",
   "cisCritical": "13, 19",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.8",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission unless otherwise protected by alternative physical safeguards.",
   "controlResult": "Outline the processes and automated mechanisms used to provide encryption of CUI during transmission; or document all alternative physical safeguards used to provide confidentiality of CUI during transmission.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-8, SC-8(1)",
   "isoMapping": "A.8.2.3, A.13.1.1, A.13.2.1, A.13.2.3, A.14.1.2, A.14.1.3",
   "cisCritical": "17",
   "dfarsCovered": "SC-8(1)"
 },
 {
   "controlNumber": "3.13.9",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity.",
   "controlResult": "Outline controls for terminating communications sessions on both internal and external networks (e.g., deallocating TCP/IP addresses/port pairs); and institute time periods of inactivity based on type of network accesses.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-10",
   "isoMapping": "A.13.1.1",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.10",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Establish and manage cryptographic keys for cryptography employed in the information system;",
   "controlResult": "Outline the processes and automated mechanisms used to provide key management within the information system (should also follow any relevant laws, regulations, and policies).",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-12",
   "isoMapping": "A.10.1.2",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.11",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.",
   "controlResult": "Outline where FIPS-validated cryptographic is used.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-13",
   "isoMapping": "A.10.1.1, A.14.1.2, A.14.1.3, A.18.1.5",
   "cisCritical": "",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.13.12",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Prohibit remote activation of collaborative computing devices and provide indication of devices in use to users present at the device.",
   "controlResult": "Enumerate actions to remove or disable collaborative computing devices from information systems housing CUI; and to notify users when collaborative computing devices are in use (e.g., cameras, microphones, etc.).",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-15",
   "isoMapping": "A.13.2.1 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "3",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.13.13",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Control and monitor the use of mobile code.",
   "controlResult": "Define limits of mobile code usage, establish usage restrictions, and specifically authorize use of mobile code (e.g., Java, ActiveX, Flash, etc.) within an information system.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-18",
   "isoMapping": "None",
   "cisCritical": "2",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.14",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Control and monitor the use of Voice over Internet Protocol (VoIP) technologies.",
   "controlResult": "Define and establish usage restrictions, and specifically authorize the business necessary use of VoIP technologies within an information system.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-19",
   "isoMapping": "None",
   "cisCritical": "",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.15",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Protect the authenticity of communications sessions.",
   "controlResult": "Outline the controls implemented to protect session communications (e.g., the controls implemented to validate identities and information transmitted to protect against MITM attacks, session hijacking, and insertion of false information into sessions).",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-23",
   "isoMapping": "None",
   "cisCritical": "16",
   "dfarsCovered": "No"
 },
 {
   "controlNumber": "3.13.16",
   "controlType": "Derived",
   "controlFamily": "System and Communications Protection",
   "controlText": "Protect the confidentiality of CUI at rest.",
   "controlResult": "Outline controls used to protect CUI while stored in organizational information systems.",
   "responsibleParty": "IT Operations",
   "nistMapping": "SC-28",
   "isoMapping": "A.8.2.3 (ISO control doesn't completely match NIST 800-53)",
   "cisCritical": "17",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.14.1",
   "controlType": "Basic",
   "controlFamily": "System and Information Integrity",
   "controlText": "Identify, report, and correct information and information system flaws in a timely manner.",
   "controlResult": "The organization will perform all security-relevant software updates, to include patching, service packs, hot fixes, and anti-virus signature additions in response to identified system flas and vulnerabilities within the time prescribed by organizational policy (Critical/High: 5 days, Moderate: 30 days, Low: As-Available).  When available, managers and administrators of the information system will rely on centralized management of the flaw remediation process, to include the use of automated update software, patch management tools, and automated status scanning.  ",
   "responsibleParty": "Data Custodian",
   "nistMapping": "SI-2, SI-3, SI-5",
   "isoMapping": "A.6.1.4 (ISO control doesn't completely match NIST 800-53), A.12.2.1, A.12.6.1, A.14.2.2, A.14.2.3, A.16.1.3",
   "cisCritical": "3, 5",
   "dfarsCovered": "SI-2, SI-3"
 },
 {
   "controlNumber": "3.14.2",
   "controlType": "Basic",
   "controlFamily": "System and Information Integrity",
   "controlText": "Provide protection from malicious code at appropriate locations within organizational information systems.",
   "controlResult": "The organization will employ malicious code protection mechanisms at information system entry and exit points to minimize the presence of malicious code.  These protection mechanisms may include, for example, firewalls, electronic mail servers, web servers, proxy servers, remote-access servers, workstations, notebook computers, and mobile devices.",
   "responsibleParty": "Data Custodian, Security Office",
   "nistMapping": "SI-2, SI-3, SI-5",
   "isoMapping": "A.6.1.4 (ISO control doesn't completely match NIST 800-53), A.12.2.1, A.12.6.1, A.14.2.2, A.14.2.3, A.16.1.3",
   "cisCritical": "3, 5",
   "dfarsCovered": "SI-2, SI-3"
 },
 {
   "controlNumber": "3.14.3",
   "controlType": "Basic",
   "controlFamily": "System and Information Integrity",
   "controlText": "Monitor information system security alerts and advisories and take appropriate actions in response.",
   "controlResult": "The organization will receive security alerts, advisories, and directives from reputable external agencies, and disseminate this information to individuals with need-to-know in the organization.  In the event of alerts, advisories, or directives that have widespread impact on the organization, internal security directives will be disseminated directly to information system users, managers, and administrators.",
   "responsibleParty": "Data Custodian, Security Office",
   "nistMapping": "SI-2, SI-3, SI-5",
   "isoMapping": "A.6.1.4 (ISO control doesn't completely match NIST 800-53), A.12.2.1, A.12.6.1, A.14.2.2, A.14.2.3, A.16.1.3",
   "cisCritical": "3, 5",
   "dfarsCovered": "SI-2, SI-3"
 },
 {
   "controlNumber": "3.14.4",
   "controlType": "Derived",
   "controlFamily": "System and Information Integrity",
   "controlText": "Update malicious code protection mechanisms when new releases are available.",
   "controlResult": "The organization will update information system protection mechanisms within 5 days of new releases.",
   "responsibleParty": "Data Custodian, Security Office",
   "nistMapping": "SI-3",
   "isoMapping": "A.12.2.1",
   "cisCritical": "5",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.14.5",
   "controlType": "Derived",
   "controlFamily": "System and Information Integrity",
   "controlText": "Perform periodic scans of the information system and real-time scans of files from external sources as files are downloaded, opened, or executed.",
   "controlResult": "The organization will perform quarterly scans of the information system, as well as real-time scanning of files from external sources. ",
   "responsibleParty": "Security Office",
   "nistMapping": "SI-3",
   "isoMapping": "A.12.2.1",
   "cisCritical": "5",
   "dfarsCovered": "Yes"
 },
 {
   "controlNumber": "3.14.6",
   "controlType": "Derived",
   "controlFamily": "System and Information Integrity",
   "controlText": "Monitor the information system including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks.",
   "controlResult": "The organizaiton will monitor the information system to detect attacks and indicators of potential attacks, as well as unauthorized local, network, and remote connections.  The organization will strategically deploy monitoring devices within the information system to collect essential information system.  Information gained from these monitoring tools will be protected from unauthorized access, modification, and deletion. ",
   "responsibleParty": "Security Office",
   "nistMapping": "SI-4, SI-4(4)",
   "isoMapping": "None",
   "cisCritical": "1, 2, 3, 5, 7, 10, 11, 12, 13, 14, 15, 16, 17, ",
   "dfarsCovered": "SI-4"
 },
 {
   "controlNumber": "3.14.7",
   "controlType": "Derived",
   "controlFamily": "System and Information Integrity",
   "controlText": "Identify unauthorized use of the information system.",
   "controlResult": "The organization will monitor the information system to identify unauthorized access and use, as well as potential misuse of the information system.",
   "responsibleParty": "Security Office",
   "nistMapping": "SI-4",
   "isoMapping": "None",
   "cisCritical": "1, 2, 3, 5, 7, 10, 11, 12, 13, 14, 15, 16, 17",
   "dfarsCovered": "Yes"
 }
]
const policies = [
{  "name": "Accounting Manual", "code": "ACF-110"},
{  "name": "Overall Accounting Controls", "code": "ACF-130"},
{  "name": "Disposition of Real Property & Equipment", "code": "ACF-140"},
{  "name": "Compensation Procedures", "code": "ACF-150"},
{  "name": "Labor Accounting System", "code": "ACF-160"},
{  "name": "Job Class and Pay Grade Manual", "code": "ACF-210"},
{  "name": "Cost Estimating Policy\/System - NOTE NEW NUMBER", "code": "ACF-310"},
{  "name": "Timekeeping and Labor Charging Policy and Procedure- ETASS Only", "code": "ACF-410"},
{  "name": "AOC Response Cell Comp Time Procedure - replaced by ACF-720", "code": "ACF-420"},
{  "name": "Timekeeping and Labor Charging Policy and Procedure", "code": "ACF-430"},
{  "name": "C2WSPTT & AOC Response Cell_Comp Time Procedure Document", "code": "ACF-720"},
{  "name": "Procurement Manual Introduction and TOC", "code": "CAP-100.1"},
{  "name": "Procurement Manual Appendix B", "code": "CAP-100.B"},
{  "name": "Procurement Manual Appendix A", "code": "CAP-100A"},
{  "name": "ACO Advance Notification and Consent", "code": "CAP-101"},
{  "name": "ACO CAS Notification", "code": "CAP-102"},
{  "name": "Cost Accounting Standards", "code": "CAP-103"},
{  "name": "CAS 414 FCCM", "code": "CAP-104"},
{  "name": "Anti-Kickback Act", "code": "CAP-105"},
{  "name": "Personal Conflict of Interest", "code": "CAP-106"},
{  "name": "Organizational Conflict of Interest", "code": "CAP-107"},
{  "name": "Procurement Standards of Conduct and Gratuities", "code": "CAP-108"},
{  "name": "Internal Audit", "code": "CAP-109"},
{  "name": "Hotline", "code": "CAP-110"},
{  "name": "Reporting Unethical Conduct and Restitution to the Government", "code": "CAP-111"},
{  "name": "Communications and Relations with Vendors", "code": "CAP-112"},
{  "name": "Debarred Suspended and Ineligible Vendor Verification", "code": "CAP-113"},
{  "name": "Commitment and Approval Authority", "code": "CAP-114"},
{  "name": "Best Value", "code": "CAP-115"},
{  "name": "Commercial Acquisitions", "code": "CAP-116"},
{  "name": "Competition", "code": "CAP-117"},
{  "name": "Defense Priority and Allocations Systems", "code": "CAP-118"},
{  "name": "Discounts for Prompt Payment", "code": "CAP-119"},
{  "name": "Documentation Checklist and File Documentation", "code": "CAP-120"},
{  "name": "Pre-Award EEO", "code": "CAP-123"},
{  "name": "Expediting and Follow-Up", "code": "CAP-124"},
{  "name": "GSA Sources", "code": "CAP-125"},
{  "name": "Letter Subcontracts", "code": "CAP-126"},
{  "name": "Make_Or_Buy Programs", "code": "CAP-127"},
{  "name": "Teaming Agreements and Anti-Trust", "code": "CAP-128"},
{  "name": "Intra_Inter-Company Transactions", "code": "CAP-129"},
{  "name": "Negotiations and Negotiation Memorandums", "code": "CAP-130"},
{  "name": "Value Engineering", "code": "CAP-131"},
{  "name": "Patent Rights and Intellectual Property", "code": "CAP-132"},
{  "name": "Price_Cost Realism and Reasonableness Analyses", "code": "CAP-133"},
{  "name": "Truth in Negotiations Act (TINA) P.L. 87-653", "code": "CAP-134"},
{  "name": "Processing Changes to Subcontracts", "code": "CAP-135"},
{  "name": "Processing Procurement Requisitions", "code": "CAP-136"},
{  "name": "Purchase Requisition", "code": "CAP-136.1"},
{  "name": "Requests for Proposals_Quotations", "code": "CAP-137"},
{  "name": "Progress_Performance-Based Payments to Subcontractors", "code": "CAP-138"},
{  "name": "Government Source Inspection", "code": "CAP-139"},
{  "name": "Government_Customer Property Administration", "code": "CAP-140"},
{  "name": "Selection of Subcontract", "code": "CAP-141"},
{  "name": "Terms and Conditions", "code": "CAP-142"},
{  "name": "Representations and Certifications", "code": "CAP-143"},
{  "name": "Restrictions on Lobbying (over $150K)", "code": "CAP-144"},
{  "name": "Authority to Make Commitments", "code": "CAP-145"},
{  "name": "Receipt of Materials", "code": "CAP-146"},
{  "name": "Reporting Foreign Subcontracts (over $650K)", "code": "CAP-147"},
{  "name": "Retention of Records", "code": "CAP-148"},
{  "name": "Safeguarding Classified Information", "code": "CAP-149"},
{  "name": "Single_Sole Source Procurements", "code": "CAP-150"},
{  "name": "Small Business Subcontracting", "code": "CAP-151"},
{  "name": "Small Business Subcontracting Plan", "code": "CAP-152"},
{  "name": "Subcontract Management and Administration", "code": "CAP-153"},
{  "name": "Subcontract Closeout", "code": "CAP-154"},
{  "name": "Terminations and Stop Work", "code": "CAP-155"},
{  "name": "Vendor Rating and Determination of Responsibility", "code": "CAP-156"},
{  "name": "Micropurchase", "code": "CAP-157"},
{  "name": "Credit Cards and Electronic Purchases", "code": "CAP-158"},
{  "name": "Supply Chain Management", "code": "CAP-159"},
{  "name": "Berry Amendment", "code": "CAP-160"},
{  "name": "Earned Value Management Systems", "code": "CAP-161"},
{  "name": "Employee Procurement Training", "code": "CAP-162"},
{  "name": "Subcontract Financial Management", "code": "CAP-163"},
{  "name": "Government Furnished Property Policy", "code": "CAP-210"},
{  "name": "Export Compliance Program Guidelines", "code": "CAP-310"},
{  "name": "P3I Code of Ethics", "code": "ETH-110"},
{  "name": "P3I Officers Code of Ethics", "code": "ETH-120"},
{  "name": "Procurement Integrity Certification", "code": "ETH-210"},
{  "name": "P3I Incorporated Financial Disclosure Statement", "code": "ETH-310"},
{  "name": "Receipt of Other Company's Proprietary Data", "code": "ETH-410"},
{  "name": "WISP Policy", "code": "HRR-130"},
{  "name": "CORI Policy", "code": "HRR-140"},
{  "name": "Drug and Alcohol Abuse Policy and Procedure", "code": "HRR-180"},
{  "name": "Executive Compensation Program", "code": "HRR-210"},
{  "name": "Telework Policy", "code": "HRR-341"},
{  "name": "Telework Standard Operating Procedure", "code": "HRR-342"},
{  "name": "Telework Agreement Form", "code": "HRR-343"},
{  "name": "SOP_Hiring and Recruiting Process_Meeting Version", "code": "HRR-410"},
{  "name": "EEO Policy", "code": "HRR-510"},
{  "name": "Anti-Harassment Policy and Procedure", "code": "HRR-520"},
{  "name": "Accommodations for Religious Observances Policy", "code": "HRR-530"},
{  "name": "401K Investment Policy Statement", "code": "HRR-610"},
{  "name": "Table of Contents (Handbook)", "code": "HRR-700.1"},
{  "name": "Introduction, Corporate Philosophy and Mission (Handbook)", "code": "HRR-700.2"},
{  "name": "Employee Handbook Cover", "code": "HRR-700.3"},
{  "name": "Employee & Management Roles & Responsiblities Policy and Procedure", "code": "HRR-703"},
{  "name": "Compensation Policy Policy and Procedure", "code": "HRR-704"},
{  "name": "Employee Referral Bonus Policy and Procedure", "code": "HRR-705"},
{  "name": "Disputes & Corrective Action Policy and Procedure", "code": "HRR-706"},
{  "name": "Termination of Employment Policy and Procedure", "code": "HRR-707"},
{  "name": "Business Travel and Expense Voucher Processing Policy and Procedure  (ADD Foreign Travel Form in 2016 review)", "code": "HRR-708"},
{  "name": "Benefits Policy and Procedure", "code": "HRR-709"},
{  "name": "Career Development Benefits Policy and Procedure", "code": "HRR-710"},
{  "name": "Attendance Policy and Procedure", "code": "HRR-712"},
{  "name": "Performance Appraisal Policy and Procedure", "code": "HRR-713"},
{  "name": "General Leaves Policy and Procedure", "code": "HRR-714"},
{  "name": "Family and Medical Leaves Policy and Procedure", "code": "HRR-715"},
{  "name": "Military Leave Policy and Procedure", "code": "HRR-716"},
{  "name": "Information Systems & Technology Policy", "code": "HRR-718"},
{  "name": "Fraternization and Nepotism Policy and Procedure", "code": "HRR-722"},
{  "name": "Solicitation and Distribution Policy and Procedure", "code": "HRR-724"},
{  "name": "Confidentiality Policy and Procedure", "code": "HRR-725"},
{  "name": "Intellectual Property Policy and Procedure", "code": "HRR-726"},
{  "name": "P3I Fax Cover", "code": "IST-110"},
{  "name": "Website Privacy Policy", "code": "IST-210"},
{  "name": "Capabilities Brief (new as of Feb2016)", "code": "MBM-120"},
{  "name": "Branding Group Charter", "code": "MBM-210"},
{  "name": "Branding Strategy Guide", "code": "MBM-220"},
{  "name": "Social Media Policy and Procedure", "code": "MBM-310"},
{  "name": "Social Media Group Charter", "code": "MBM-330"},
{  "name": "CSR Group Charter", "code": "MBM-410"},
{  "name": "P3I_Steering Committee_Process Working Group Charter", "code": "PRO-110"},
{  "name": "Strategic Focus", "code": "PRO-431"},
{  "name": "Organizational Training Policy", "code": "PRO-450"},
{  "name": "DAR SOP", "code": "PRO-521"},
{  "name": "DAR Policy", "code": "PRO-522"},
{  "name": "Configuration Management Policy", "code": "PRO-531"},
{  "name": "Configuration Management Standard Operating Procedure", "code": "PRO-533"},
{  "name": "Process_Product Quality Assurance (PPQA) Policy", "code": "PRO-541"},
{  "name": "Quality Assurance Procedures", "code": "PRO-542"},
{  "name": "Insider Threat Policy", "code": "SES-105"},
{  "name": "New Hire Security Clearance", "code": "SES-110"},
{  "name": "Health, Safety and Environmental Policy and Procedure", "code": "SES-210"},
{  "name": "Health, Safety and Environmental Briefing", "code": "SES-220"},
{  "name": "Incident Report Guidelines", "code": "SES-310"},
{  "name": "Physical Security Policy and Procedure", "code": "SES-410"},
{  "name": "Training Plan", "code": "TRN-110"},
{  "name": "Travel Itinerary Form ", "code": "TVL-110"},
{  "name": "Travel Authorization Form ", "code": "TVL-120"},
{  "name": "Notification of Foreign Travel ", "code": "TVL-130"},
]
console.log('Syncing database');

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => Promise.all(sectionArray.map(section =>Section.create(section))))
  .then(() => Promise.all(policies.map(policy => Policy.create(policy))))
  .then(() => Promise.all(controlArray.map((control,index) =>{
    const sectionNumber = parseInt(control.controlNumber.split('.')[1]);
    const sectionIndex = parseInt(control.controlNumber.split('.')[2]);
    control.section_id = sectionNumber
    control.sectionIndex = sectionIndex
    Control.create(control)
    })
  ))
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
