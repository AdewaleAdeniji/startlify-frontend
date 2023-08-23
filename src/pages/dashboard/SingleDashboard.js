import { Spinner, chakra, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MailMan from "../../components/dashboard/MailMan";
import BasicStatistics from "../../components/dashboard/Stats";
import SidebarWithHeader from "../../components/layout/SideBar";
import { CHANGE_EMAIL_TYPES } from "../../constants";
import { useCache } from "../../helpers/utils";
import { GetEmails, GetUserEmails } from "../../services/api";

const SingleDashboard = () => {
  // need to fetch all emails and pass i
  const toast = useToast();
  const { emailAddressID } = useParams();
  const { getData, saveData } = useCache();
  const [userEmailAddresses, setUserEmailAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState(getData(`${emailAddressID}-emails`, []));
  const [details, setDetails] = useState(JSON.parse(getData(emailAddressID, "{}")));
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    setupDashboard(true); // Initial setup
    const interval = setInterval(() => {
      setupDashboard(false); // Subsequent setups every 7 seconds
    }, 7000); // 7 seconds in milliseconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [emailAddressID]);
  if (!emailAddressID) {
    window.location.href = "/app/dashboard";
    return;
  }
  const handleOpenEmail  =  (emailAddressID, emailID) => {
    navigate(`/app/email/${emailID}/${emailAddressID}`);
  }
  const setupDashboard = async (proceed = true) => {
    setLoading(true);
    setLoadingText("Setting up...");
    getAllMails();
    const api = await GetUserEmails();
    if (!api.success) {
      return toast({
        title: api.message,
        status: "error",
        isClosable: true,
      });
    }
    setUserEmailAddresses(api.emails);
    saveData('user-emails', api.emails)
    if (api.emails.length > 0) {
      const selectedEmail = api.emails.filter(
        (em) => em.emailAddressID === emailAddressID
      );

      if (selectedEmail.length > 0) {
        // found it
        saveData(emailAddressID, JSON.stringify(selectedEmail[0]))
        setDetails(selectedEmail[0]);
      }
    }
    setLoading(false);
    setLoadingText("");
  };
  const handleChangeEmail = (updateType, emailChange) => {
    setLoadingText("Refreshing mails");
    if(updateType ===  CHANGE_EMAIL_TYPES.REFRESH) {
      setupDashboard(true)
      return;
    }
    setEmails([])
    if (updateType === CHANGE_EMAIL_TYPES.EMAIL_CREATED) {
      setupDashboard(false);
    }
    navigate(`/app/dashboard/${emailChange.emailAddressID}`);
  };
  const getAllMails = async () => {
    setLoadingText("Refreshing emails");
    setLoading(true);
    const api = await GetEmails(emailAddressID);
    if (!api.success) {
      return toast({
        title: api.message,
        status: "error",
        isClosable: true,
      });
    }
    setLoading(false);
    setLoadingText("");
    // if (api.emails.length > 0) {
      saveData(`${emailAddressID}-emails`, api.emails)
      setEmails(api.emails);
    // }
  };
  return (
    <SidebarWithHeader
      activeEmail={details?.emailAddress}
      emails={userEmailAddresses}
      handleChangeEmail={handleChangeEmail}
    >
      <BasicStatistics
        text={"Showing all inboxes"}
        activeEmail={details?.emailAddress}
        totalEmails={emails.length}
        emails={userEmailAddresses}
        handleChangeEmail={handleChangeEmail}
        showStats={false}
        loading={loading}
      />
      {loading && (
        <chakra.h1
          textAlign={"center"}
          fontSize={"sm"}
          fontWeight={"bold"}
          p={5}
        >
          <Spinner /> {loadingText}
        </chakra.h1>
      )}

      {!loading && (
        <chakra.h1
          textAlign={"right"}
          fontSize={"sm"}
          fontWeight={"bold"}
          p={5}
        >
          Showing {emails.length} of {emails.length}
        </chakra.h1>
      )}
      <MailMan emails={emails} loading={loading} handleOpenEmail={handleOpenEmail}/>
    </SidebarWithHeader>
  );
};
export default SingleDashboard;
