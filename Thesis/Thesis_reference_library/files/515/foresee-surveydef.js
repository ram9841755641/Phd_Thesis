FSR.surveydefs = [{
    name: 'search',
	pin: 1,
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    criteria: {
        sp: 8,
        lf: 3
    },
    include: {
        urls: ['search.proquest.com']
    }
},{
    name: 'browse',
	lock: 1,
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    criteria: {
        sp: 35,
        lf: 1
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    exclude: {
        variables: [{
            name: 'strUserIP',
            value: ['165.215.*', '192.22.150.*', '199.1.202.*', '12.228.212.98', '165.254.62.*', '192.132.3.31', '192.234.22.34', '208.48.241.51', '208.28.241.62',
'130.36.*',
/^12\.237\.254\.(1(29|[3-4][0-9]|5[0-8]))$/,
/^14\.63\.33\.([1-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-4]))$/,
/^65\.120\.33\.(1(9[2-9])|2(0[0-6]))$/,
/^77\.242\.201\.(49|5[0-9]|6[0-2])$/,
/^94\.88\.95\.(3[3-9]|4[0-6])$/,
/^94\.91\.16\.(1(8[5-9]|90))$/,
/^122\.194\.12\.(1(9[3-9])|2(0[0-6]))$/,
/^193\.169\.10\.(3[4-5])$/,
/^202\.172\.50\.(1(9[3-9])|2(0[0-6]))$/,
/^203\.116\.12\.(1(9[3-9])|2(0[0-6]))$/,
/^203\.152\.39\.(1(1[3-9]|2[0-6]))$/,
/^210\.184\.74\.(2(2[0-1]))$/,
/^212\.44\.14\.(2(3[3-8]))$/,
/^212\.44\.18\.(1(1[3-9]|2[0-6]))$/,
/^212\.118\.224\.(1(4[5-9]|5[0-8]))$/,
/^213\.215\.133\.(5[3-5])$/,
/^80\.251\.166\.(4[8-9]|5[0-5])$/,
/^86\.61\.67\.(1(3[1-2]))$/,
/^193\.91\.65\.(2(3[5-7]))$/,
/^194\.120\.15\.(1(0[0-2]))$/,
/^194\.120\.17\.(1(9[3-8]))$/,
/^194\.228\.80\.(8[8-9]|9[0-5])$/,
/^195\.193\.210\.(49|5[0-9]|6[0-2])$/,
/^200\.47\.30\.([1-9]|10)$/,
/^217\.67\.19\.(2(2[4-9]|3[0-2]))$/,
/^195\.24\.27\.(2(5[3-4]))$/,
'151.207.*',
'83.137.211.42',
'12.51.35.2',
'12.171.11.62',
'12.171.12.131',
'12.171.12.143',
'12.171.12.254',
'58.71.10.107',
'61.213.7.40',
'61.220.180.98',
'62.99.209.246',
'63.240.132.61',
'63.240.180.203',
'63.244.5.1',
'64.73.244.162',
'79.173.144.213',
'94.76.216.6',
'114.251.233.65',
'122.194.119.162',
'173.164.226.105',
'180.168.180.146',
'193.169.10.48',
'193.169.10.64',
'193.169.10.65',
'193.169.10.66',
'193.169.10.67',
'195.141.68.123',
'195.167.128.242',
'200.94.60.165',
'202.155.12.141',
'202.155.12.243',
'203.152.39.112',
'204.101.47.229',
'204.101.218.61',
'210.65.220.134',
'210.146.0.10',
'210.213.57.226',
'212.117.69.86',
'212.117.69.94',
'217.204.110.233',
'221.238.202.178',
'12.39.43.193',
'12.39.48.147',
'12.171.11.62',
'12.171.12.131',
'63.240.180.203',
'195.167.128.242',
'208.247.54.21',
'212.117.69.94',
'194.14.188.11',
'62.105.139.100',
'66.241.130.142',
'69.27.249.194',
'80.76.62.74',
'80.120.10.186',
'80.239.75.234',
'81.198.211.132',
'115.42.218.36',
'187.9.59.61',
'194.7.34.1',
'194.78.22.118',
'194.120.16.101',
'194.120.17.57',
'194.120.17.199',
'194.142.145.194',
'194.218.37.98',
'194.255.110.66',
'200.53.117.100',
'203.106.122.3',
'203.166.111.155',
'213.180.185.101',
'213.197.135.50',
'216.183.94.91',
'217.96.28.200',
'217.192.12.130',
'155.137.0.9',
'202.94.100.66',
'216.95.231.82',
'63.111.9.245',
'63.111.9.253',
'195.24.27.34',
'195.24.27.245',
'202.95.91.15',
'202.95.91.29']
        }]
    },
    
    ipexclude: 'strUserIP',
    
    invite: {
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
		<b><font size=\"3\">We\'d like your feedback.</b></font>\
		<br><br>Thank you for using ProQuest or ProQuest Dialog. You have been randomly selected to participate in a user satisfaction survey to help us improve your online research experience.\
		<br><br>The survey will appear at the end of your visit.\
		<br><br><div class="fsr_closeButtons">\
		<button onmouseover=\"className=\'fsr_button fsr_mouseover_decline\';\" onmouseout=\"className=\'fsr_button fsr_decline\';\" class=\"fsr_button fsr_decline\" id=\"decline\" onclick=\"FSR.declined()\" style=\"cursor: pointer\">No thanks</button>\
		<button onmouseover=\"className=\'fsr_button fsr_mouseover_accept\';\" onmouseout=\"className=\'fsr_button fsr_accept\';\" class=\"fsr_button fsr_accept\" id=\"accept\" onclick=\"FSR.accepted()\" style=\"cursor: pointer\">Yes, I\'ll give feedback</button></div>\
		<font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>',
        
        /*content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
         <b><font size=\"3\">We\'d like your feedback.</b></font>\
         <br><br>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.\
         <br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>',
         */
        exclude: {
            local: [/search\.proquest\.com\/myresearch/, /http\:\/\/trials\.proquest\.com\/pqte\/cust\/requestTrial\.do/, /\/utilities\/widgets\//, /\/utilities\/syndication\//, /http\:\/\/support\.proquest\.com\//],
            referrer: []
        },
        include: {
            local: ['.']
        },
        
        width: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        timeout: 0,
        //buttons: {
        //    accept: "Yes, I'll give feedback",
        //    decline: 'No thanks'
        // },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        hide: []
    },
    
    tracker: {
        width: '500',
        height: '350',
        timeout: 3,
        adjust: true,
        alert: {
            enabled: false,
            message: 'The survey is now available.'
        },
        url: 'tracker.html'
    },
    
    survey: {
        width: 550,
        height: 600
    },
    
    qualifier: {
        width: '625',
        height: '400',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: false,
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referrer: true,
        terms: true,
        ref_url: true,
        url: true,
        url_params: false
    },
    
    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802
        },
        pd: 7,
        custom: {
            purchase: {
                enabled: true,
                repeat: false,
                source: 'url',
                patterns: ['/advanced', '/myresearch']
            }
        }
    },
    
    
    cpps: {
        Error_Page: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/errorpage',
                value: 'yes'
            }]
        },
        No_Results: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/noresults',
                value: 'yes'
            }]
        },
        My_Research: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/myresearch',
                value: 'yes'
            }]
        },
        Advanced: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/advanced',
                value: 'yes'
            }]
        },
        Professional: {
            source: 'url',
            init: 'no',
            patterns: [{
                regex: '/professional',
                value: 'yes'
            }]
        },
        Account_ID: {
            source: 'parameter',
            name: 'accountid'
        },
        User_IP: { //This will need to be captured server side and assigned to a variable
            source: 'variable', //named "strUserIP"
            name: 'strUserIP'
        },
        Session_ID: { //This will be to be assigned to a variable named "strSessionID"
            source: 'variable', //from whatever source is available.
            name: 'strSessionID'
        }
    },
    
    pool: 100,
    
    previous: false,
    
    analytics: {
        google: false
    },
    
    mode: 'first-party'
};
