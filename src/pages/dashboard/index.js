import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MailMan from "../../components/dashboard/MailMan";
import SidebarWithHeader from "../../components/layout/SideBar";
import { GetAllEmails, GetUserEmails } from "../../services/api";

const Dashboard = () => {
  // need to fetch all emails and pass it
  const [userEmailAddresses, setUserEmailAddresses] = useState([]);
  const [loading, setLoading] = useState([]);
  const [emails, setEmails] = useState([]);

  const toast = useToast();
  useEffect(() => {
    setupDashboard();
    console.log("called");
  }, []);
  const setupDashboard = async () => {
    setLoading(true);
    const api = await GetUserEmails();
    if (!api.success) {
      return toast({
        title: api.message,
        status: "error",
        isClosable: true,
      });
    }
    setUserEmailAddresses(api.emails);
    if (api.emails.length > 0) {
      getAllMails(api.emails);
    }
  };
  const handleChangeEmail = (em) => {
      console.log(em.emailAddressID)
  }
  const getAllMails = async (emails) => {
    console.log("got here");

    const api = await GetAllEmails(emails);
    setLoading(false);
    console.log(api);
    if (api.length > 0) {
      setEmails(api);
    }
  };
  return (
    <SidebarWithHeader activeEmail={"All"} emails={userEmailAddresses} handleChangeEmail={handleChangeEmail}>
      <MailMan emails={emails} />
    </SidebarWithHeader>
  );
};
export default Dashboard;
