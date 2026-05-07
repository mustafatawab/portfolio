interface ContactEmailProps {
  first_name: string;
  last_name?: string;
  email: string;
  project_type: string;
  budget: string;

  message: string;
}

export function contactEmailTemplate(data: ContactEmailProps): string {
  const { first_name, last_name, email, project_type, budget, message } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Transmission</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f0;font-family:'Courier New',Courier,monospace;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="padding-bottom:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:4px;color:#888;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Communication Protocol</p>
                    <p style="margin:0;font-size:30px;font-weight:900;letter-spacing:-1px;color:#0a0a0a;font-family:Georgia,serif;text-transform:uppercase;">
                      INITIATE <span style="color:#00b4cc;">TRANS</span><span style="color:#9b30d9;">MISSION</span>
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <div style="display:inline-block;border:1.5px solid #e0e0e0;border-radius:8px;padding:8px 14px;background:#ffffff;">
                      <p style="margin:0;font-size:10px;letter-spacing:3px;color:#aaa;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">{ MUSTAFA }</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ACCENT RULE -->
          <tr>
            <td style="padding-bottom:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="60%" style="height:2px;background:#00b4cc;"></td>
                  <td width="20%" style="height:2px;background:#9b30d9;"></td>
                  <td width="20%" style="height:2px;background:#e8e8e4;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- IDENTITY BLOCK -->
          <tr>
            <td style="padding-bottom:16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1.5px solid #e8e8e4;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:6px 18px;background:#fafaf8;border-bottom:1px solid #e8e8e4;">
                    <p style="margin:0;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Node Identification</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding-bottom:16px;padding-right:16px;">
                          <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">First Name</p>
                          <p style="margin:0;font-size:16px;color:#0a0a0a;font-weight:700;font-family:Georgia,serif;">${first_name}</p>
                        </td>
                        <td width="50%" style="padding-bottom:16px;">
                          <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Last Name</p>
                          <p style="margin:0;font-size:16px;color:#0a0a0a;font-weight:700;font-family:Georgia,serif;">${last_name ?? "—"}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:1px solid #f0f0ec;padding-top:14px;">
                          <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Return Address</p>
                          <a href="mailto:${email}" style="font-size:14px;color:#00b4cc;text-decoration:none;font-family:'Courier New',Courier,monospace;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MISSION BLOCK -->
          <tr>
            <td style="padding-bottom:16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1.5px solid #e8e8e4;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:6px 18px;background:#fafaf8;border-bottom:1px solid #e8e8e4;">
                    <p style="margin:0;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Mission Parameters</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding-right:16px;">
                          <p style="margin:0 0 6px;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Mission Type</p>
                          <span style="display:inline-block;padding:5px 12px;background:#e8f9fc;border:1.5px solid #00b4cc;border-radius:6px;font-size:12px;color:#00859a;letter-spacing:1px;font-family:'Courier New',Courier,monospace;">${project_type}</span>
                        </td>
                        <td width="50%">
                          <p style="margin:0 0 6px;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Resource Allocation</p>
                          <span style="display:inline-block;padding:5px 12px;background:#f5eeff;border:1.5px solid #9b30d9;border-radius:6px;font-size:12px;color:#7a20b8;letter-spacing:1px;font-family:'Courier New',Courier,monospace;">${budget}</span>
                        </td>
                      </tr>
                     
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE BLOCK -->
          <tr>
            <td style="padding-bottom:28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1.5px solid #e8e8e4;border-left:4px solid #00b4cc;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:6px 18px;background:#fafaf8;border-bottom:1px solid #e8e8e4;">
                    <p style="margin:0;font-size:9px;letter-spacing:3px;color:#bbb;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Briefing Message</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 18px;">
                    <p style="margin:0;font-size:14px;line-height:1.9;color:#444;white-space:pre-wrap;font-family:Georgia,serif;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER RULE -->
          <tr>
            <td style="padding-bottom:20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:1px;background:#e0e0da;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding-bottom:8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 3px;font-size:10px;color:#aaa;letter-spacing:2px;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Farsight Systems</p>
                    <p style="margin:0;font-size:10px;color:#ccc;letter-spacing:0.5px;font-family:'Courier New',Courier,monospace;">farsightsystem.com · mustafa.tawab.dev@gmail.com</p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0;font-size:9px;color:#ccc;letter-spacing:2px;text-transform:uppercase;font-family:'Courier New',Courier,monospace;">Transmission Received</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}
