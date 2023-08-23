import { Spinner, chakra, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailMan from "../../components/dashboard/MailMan";
import BasicStatistics from "../../components/dashboard/Stats";
import SidebarWithHeader from "../../components/layout/SideBar";
import { CHANGE_EMAIL_TYPES } from "../../constants";
import { GetEmails, GetUserEmails } from "../../services/api";
import { useCache } from "../../helpers/utils";

const Dashboard = () => {
  // need to fetch all emails and pass it
  const { getData, saveData } = useCache();
  const [userEmailAddresses, setUserEmailAddresses] = useState(
    getData(`user-emails`, [])
  );
  const [loading, setLoading] = useState([]);
  const [emails, setEmails] = useState(getData(`d$jjj`, []));
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("");
  const toast = useToast();

  useEffect(() => {
    setupDashboard(true); // Initial setup
    const interval = setInterval(() => {
      setupDashboard(true); // Subsequent setups every 7 seconds
    }, 7000); // 7 seconds in milliseconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const setupDashboard = async (proceed = true) => {
    setLoading(true);
    setLoadingText("Setting up...");
    const api = await GetUserEmails();
    if (!api.success) {
      return toast({
        title: api.message,
        status: "error",
        isClosable: true,
      });
    }
    setUserEmailAddresses(api.emails);
    saveData("user-emails", api.emails);
    setLoading(false);
    setLoadingText("");
    if (api.emails.length > 0 && proceed) {
      getAllMails(api.emails);
    }
  };
  const handleOpenEmail = (emailAddressID, emailID) => {
    navigate(`/app/email/${emailID}/${emailAddressID}`);
  };
  const handleChangeEmail = (updateType, emailChange) => {
    setLoadingText("Refreshing mails");
    if (updateType === CHANGE_EMAIL_TYPES.REFRESH) {
      setupDashboard(true);
      return;
    }
    if (updateType === CHANGE_EMAIL_TYPES.EMAIL_CREATED) {
      setupDashboard(false);
    }
    navigate(`/app/dashboard/${emailChange.emailAddressID}`);
  };
  const getAllMails = async (emails) => {
    setLoadingText("Refreshing emails");
    setLoading(true);
    const api = await GetAllEmails(emails);
    setLoading(false);
    setLoadingText("");
    if (api.length > 0) {
      setEmails([]);
      saveData("d$jjj", api);
      setEmails(api);
    }
  };
  const GetAllEmails = async (emails) => {
    const email = [];
    for (var i = 0; i < emails.length; i++) {
      const mail = emails[i];
      const mails = await GetEmails(mail.emailAddressID);
      if (mails.success) {
        email.push(mails.emails);
      }
      // setEmails(email.flat(1));
    }
    return email.flat(1);
  };
  return (
    <SidebarWithHeader
      activeEmail={"All"}
      emails={userEmailAddresses}
      handleChangeEmail={handleChangeEmail}
    >
      <BasicStatistics
        text={"Showing all inboxes"}
        activeEmail={"All"}
        totalEmails={emails.length}
        emails={userEmailAddresses}
        handleChangeEmail={handleChangeEmail}
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
      {!loading && userEmailAddresses.length === 0 && (
        <chakra.h1
          textAlign={"center"}
          fontSize={"sm"}
          fontWeight={"bold"}
          p={5}
        >
          You have not created any custom email. <br />
          Click on create email on the
          top menu to get started.
        </chakra.h1>
      )}

      <MailMan
        emails={emails}
        loading={loading}
        handleOpenEmail={handleOpenEmail}
      />
    </SidebarWithHeader>
  );
};
export default Dashboard;
