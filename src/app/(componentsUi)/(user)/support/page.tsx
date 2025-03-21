"use client";
import React from "react";
import Layout from "../layout";
import {
  Typography,
  Box,
  Grid,
  Card,
  TextField,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import useAuthentication from "@/app/helper/authenticationHelper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export default function page() {
  // Check if the user is logged in and has the role of USER
  useAuthentication({ allowedRoles: ["USER"], redirectTo: "/login" });

  return (
    <>
      <Layout>
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold mb-6 text-center sm:text-left text-gray-800 border-b pb-4"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
            }}
          >
            <SupportAgentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Customer Support
          </Typography>

          <Grid container spacing={4}>
            {/* Contact Form Section */}
            <Grid item xs={12} md={7}>
              <Paper elevation={2} className="p-5 sm:p-8 rounded-lg">
                <Typography
                  variant="h5"
                  className="font-semibold mb-4 text-gray-700"
                >
                  <ContactSupportIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Contact Us
                </Typography>
                <Typography variant="body1" className="mb-6 text-gray-600">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </Typography>

                <Box component="form" className="space-y-4">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        required
                        type="email"
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    required
                    size="small"
                  />

                  <TextField
                    fullWidth
                    label="Your Message"
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                    placeholder="Please describe your issue in detail..."
                  />

                  <Box className="flex justify-end">
                    <Button
                      variant="contained"
                      color="primary"
                      className="mt-4"
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: "medium",
                      }}
                    >
                      Submit Request
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* FAQ Section */}
            <Grid item xs={12} md={5}>
              <Paper elevation={2} className="p-5 sm:p-8 rounded-lg">
                <Typography
                  variant="h5"
                  className="font-semibold mb-4 text-gray-700"
                >
                  <HelpOutlineIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Frequently Asked Questions
                </Typography>

                <Box className="mt-4">
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className="font-medium">
                        How do I book a service?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-gray-600">
                        You can book a service by navigating to our Services
                        page, selecting your desired service, and following the
                        booking instructions.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className="font-medium">
                        What is your cancellation policy?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-gray-600">
                        You can cancel your booking up to 24 hours before the
                        scheduled service without any charges. Cancellations
                        made within 24 hours may incur a fee.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className="font-medium">
                        How do I track my booking status?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-gray-600">
                        You can check your booking status in the "My Bookings"
                        section of your account dashboard.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className="font-medium">
                        Can I change my appointment time?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-gray-600">
                        Yes, you can reschedule your appointment through the "My
                        Bookings" section, subject to availability.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Paper>

              {/* Contact Info */}
              <Card className="mt-4 p-5 bg-gray-50">
                <Typography variant="h6" className="font-medium mb-3">
                  Direct Contact
                </Typography>
                <Divider className="mb-4" />
                <Box className="space-y-2">
                  <Typography
                    variant="body2"
                    className="flex items-center text-gray-700"
                  >
                    <strong className="mr-2">Email:</strong>{" "}
                    support@sripandit.com
                  </Typography>
                  <Typography
                    variant="body2"
                    className="flex items-center text-gray-700"
                  >
                    <strong className="mr-2">Phone:</strong> +91 9876543210
                  </Typography>
                  <Typography
                    variant="body2"
                    className="flex items-center text-gray-700"
                  >
                    <strong className="mr-2">Hours:</strong> Monday-Friday,
                    9am-6pm IST
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
}
