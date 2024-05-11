
export async function insertHeader() {
  await Word.run(async (context) => {
    const header = context.document.body.insertText(
      "This is a sample Heading 1 Title!!\n",
      "Start" /*this means at the beginning of the body */
    );
    header.styleBuiltIn = Word.BuiltInStyleName.heading1;

    await context.sync();
  });
}

export async function addParagraphs() {
  await Word.run(async (context) => {
    const paragraph = context.document.body.insertParagraph("Timeline", "End");
    paragraph.styleBuiltIn = "Heading2";
    const paragraph2 = context.document.body.insertParagraph(
      "The Services shall commence on July 31, 2015, and shall continue through July 29, 2015.",
      "End"
    );
    paragraph2.styleBuiltIn = "Normal";
    const paragraph3 = context.document.body.insertParagraph("Project Costs by Phase", "End");
    paragraph3.styleBuiltIn = "Heading2";
    // Note a content control with the title of "ProjectCosts" is added. Content will be replaced later.
    const paragraph4 = context.document.body.insertParagraph("<Add Project Costs Here>", "End");
    paragraph4.styleBuiltIn = "Normal";
    paragraph4.font.highlightColor = "#FFFF00";
    const contentControl = paragraph4.insertContentControl();
    contentControl.title = "ProjectCosts";
    const paragraph5 = context.document.body.insertParagraph("Project Team", "End");
    paragraph5.styleBuiltIn = "Heading2";
    paragraph5.font.highlightColor = "#FFFFFF";
    const paragraph6 = context.document.body.insertParagraph("Terms of Work", "End");
    paragraph6.styleBuiltIn = "Heading1";
    const paragraph7 = context.document.body.insertParagraph(
      "Contractor shall provide the Services and Deliverable(s) as follows:",
      "End"
    );
    paragraph7.styleBuiltIn = "Normal";
    const paragraph8 = context.document.body.insertParagraph("Out-of-Pocket Expenses / Invoice Procedures", "End");
    paragraph8.styleBuiltIn = "Heading2";
    const paragraph9 = context.document.body.insertParagraph(
      "Client will be invoiced monthly for the consulting services and T&L expenses. Standard Contractor invoicing is assumed to be acceptable. Invoices are due upon receipt. client will be invoiced all costs associated with out-of-pocket expenses (including, without limitation, costs and expenses associated with meals, lodging, local transportation and any other applicable business expenses) listed on the invoice as a separate line item. Reimbursement for out-of-pocket expenses in connection with performance of this SOW, when authorized and up to the limits set forth in this SOW, shall be in accordance with Client's then-current published policies governing travel and associated business expenses, which information shall be provided by the Client Project Manager.",
      "End"
    );
    paragraph9.styleBuiltIn = "Normal";
    // Insert a page break at the end of the document.
    context.document.body.insertBreak("Page", "End");

    await context.sync();
  });
}

export async function addContentControls() {
  // Simulates creation of a template. First searches the document for instances of the string "Contractor",
  // then changes the format  of each search result,
  // then wraps each search result within a content control,
  // finally sets a tag and title property on each content control.
  await Word.run(async (context) => {
    const results = context.document.body.search("Contractor");
    results.load("font/bold");

    // Check to make sure these content controls haven't been added yet.
    const customerContentControls = context.document.contentControls.getByTag("customer");
    customerContentControls.load("text");
    await context.sync();

    if (customerContentControls.items.length === 0) {
      for (let i = 0; i < results.items.length; i++) {
        results.items[i].font.bold = true;
        let cc = results.items[i].insertContentControl();
        cc.tag = "customer"; // This value is used in the next step of this sample.
        cc.title = "Customer Name " + i;
      }
    }
    await context.sync();
  });
}

export async function changeCustomer() {
  await Word.run(async (context) => {
    const contentControls = context.document.contentControls.getByTag("customer");
    contentControls.load("text");

    await context.sync();

    for (let i = 0; i < contentControls.items.length; i++) {
      contentControls.items[i].insertText("Fabrikam", "Replace");
    }

    await context.sync();
  });
}

export async function addFooter() {
  await Word.run(async (context) => {
    context.document.sections
      .getFirst()
      .getFooter("Primary")
      .insertParagraph("Confidential", "End");

    await context.sync();
  });
}

// Default helper for invoking an action and handling errors.
export async function tryCatch(callback:any) {
  try {
    await callback();
  } catch (error) {
    // Note: In a production add-in, you'd want to notify the user through your add-in's UI.
    console.error(error);
  }
}
