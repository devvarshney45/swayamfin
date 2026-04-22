import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav_home: "Home",
          nav_services: "Services",
          nav_about: "About Us",
          nav_partners: "Partners",
          nav_contact: "Contact",
          hero_badge: "RBI Compliant Fintech Partner",
          hero_title_1: "Empowering You for Financial Success",
          hero_title_2: "Working Capital When You Need It",
          hero_title_3: "Your Dream Home is Closer Than You Think",
          hero_sub_1: "Fast Loans for Growing Businesses",
          hero_sub_2: "Apply in 5 Minutes — Fast Decisions",
          hero_sub_3: "Affordable Housing Loans — Tie-up with DMI Housing",
          hero_stats_disbursed: "Disbursed",
          hero_stats_enterprises: "Enterprises",
          form_title: "Check Eligibility",
          form_name: "Full Name",
          form_mobile: "Mobile Number",
          form_email: "Email (Optional)",
          form_loan_type: "Select Loan Type",
          form_amount: "Amount (₹)",
          form_city: "Select Branch City",
          form_submit: "Get Funding Proposal",
          form_submitting: "Processing...",
          form_success: "Application Submitted Successfully!",
          form_duplicate: "Duplicate Entry: This number was used in the last 24 hours.",
          services_title: "Customized Lending Solutions",
          services_subtitle: "Our Product Suite",
          services_desc: "Tailored financial products designed to bridge your capital requirements with speed, flexibility, and transparency.",
          explore_details: "Explore Details",
          portal_back_dashboard: "Back to Dashboard",
          portal_generate_case: "Generate New Case",
          portal_register_desc: "Manually register a new loan inquiry into the system.",
          portal_applicant_name: "Applicant Name",
          portal_mobile_number: "Mobile Number",
          portal_city_location: "City / Location",
          portal_loan_type: "Loan Type",
          portal_amount_required: "Loan Amount Required (₹)",
          portal_create_assign: "Create Case & Assign",
          portal_processing: "Processing..."
        }
      },
      hi: {
        translation: {
          nav_home: "मुख्य पृष्ठ",
          nav_services: "सेवाएं",
          nav_about: "हमारे बारे में",
          nav_partners: "साझेदार",
          nav_contact: "संपर्क",
          hero_badge: "RBI अनुपालन फिनटेक पार्टनर",
          hero_title_1: "वित्तीय सफलता के लिए आपको सशक्त बनाना",
          hero_title_2: "जब आपको जरूरत हो, तब वर्किंग कैपिटल",
          hero_title_3: "आपका सपनों का घर आपकी सोच से भी करीब है",
          hero_sub_1: "बढ़ते व्यवसायों के लिए तेज़ ऋण",
          hero_sub_2: "5 मिनट में आवेदन करें — त्वरित निर्णय",
          hero_sub_3: "किफायती आवास ऋण — DMI हाउसिंग के साथ गठजोड़",
          hero_stats_disbursed: "वितरित",
          hero_stats_enterprises: "उद्यम",
          form_title: "पात्रता जांचें",
          form_name: "पूरा नाम",
          form_mobile: "मोबाइल नंबर",
          form_email: "ईमेल (वैकल्पिक)",
          form_loan_type: "ऋण का प्रकार चुनें",
          form_amount: "राशि (₹)",
          form_city: "शाखा शहर चुनें",
          form_submit: "फंडिंग प्रस्ताव प्राप्त करें",
          form_submitting: "प्रक्रिया जारी है...",
          form_success: "आवेदन सफलता पूर्वक जमा हो गया!",
          form_duplicate: "डुप्लिकेट प्रविष्टि: यह नंबर पिछले 24 घंटों में उपयोग किया गया था।",
          services_title: "अनुकूलित ऋण समाधान",
          services_subtitle: "हमारा उत्पाद सूट",
          services_desc: "गति, लचीलेपन और पारदर्शिता के साथ आपकी पूंजी की आवश्यकताओं को पूरा करने के लिए डिज़ाइन किए गए व्यक्तिगत वित्तीय उत्पाद।",
          explore_details: "विवरण देखें",
          portal_back_dashboard: "डैशबोर्ड पर वापस जाएं",
          portal_generate_case: "नया केस जनरेट करें",
          portal_register_desc: "सिस्टम में मैन्युअल रूप से नई ऋण पूछताछ दर्ज करें।",
          portal_applicant_name: "आवेदक का नाम",
          portal_mobile_number: "मोबाइल नंबर",
          portal_city_location: "शहर / स्थान",
          portal_loan_type: "ऋण का प्रकार",
          portal_amount_required: "अनुरोधित ऋण राशि (₹)",
          portal_create_assign: "केस बनाएं और सौंपें",
          portal_processing: "प्रक्रिया जारी है..."
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
