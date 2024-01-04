const loggedinUser = {
  email: "user@appsus.com",
  fullName: "Mahatma Appsus",
};

const filterBy = {
  status: "inbox", //"inbox/sent/star/trash",
  txt: "", // no need to support complex text search
  isRead: null, // true / false  (optional property, if missing: show all)
};

import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  getDefaultFilter,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy, params, isAscending) {
  const emails = await storageService.query(STORAGE_KEY);
  let filteredEmails = emails;
  if (params.folder === "starred") {
    filteredEmails = emails.filter((email) => email.isStarred);
  } else if (params.folder === "sent") {
    filteredEmails = emails.filter((email) => email.sentAt);
  } else if (params.folder === "trash") {
    filteredEmails = emails.filter((email) => email.removedAt);
  } else if (params.folder === "inbox") {
    filteredEmails = emails.filter((email) => !email.removedAt);
  } else if (params.folder === "drafts") {
    console.log("drafts");
  }

  emails.sort((a, b) =>
    isAscending ? a.sentAt - b.sentAt : b.sentAt - a.sentAt
  );

  if (!filterBy) return emails;

  if (filterBy.txt) {
    console.log(filterBy);
    filteredEmails = filteredEmails.filter((email) => {
      const subject = email.subject;
      const body = email.body;
      const jointString = [subject, body].join(" ");
      return jointString.toLowerCase().includes(filterBy.txt.toLowerCase());
    });
  }

  if (filterBy.isRead === true) {
    filteredEmails = filteredEmails.filter(
      (email) => email.isRead === filterBy.isRead
    );
  }

  // if (filterBy.status === "star") {
  //     filteredEmails = filteredEmails.filter(email => email.isStarred);
  // }

  // if (filterBy.status === "trash") {
  //     filteredEmails = filteredEmails.filter(email => !email.removedAt);
  // }

  return filteredEmails;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    emailToSave.isOn = false;
    emailToSave.sentAt = new Date().getTime();
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(
  subject = "",
  body = "",
  isRead = false,
  isStarred = false,
  sentAt = null,
  removedAt = null,
  from = "",
  to = ""
) {
  return {
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  };
}

function getDefaultFilter() {
  return {
    status: "",
    txt: "",
    isRead: null,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    [
      {
        id: "e101",
        subject: "Miss you!",
        body: "How are you dear? Will you come to the wedding tonight?",
        isRead: false,
        isStarred: false,
        sentAt: 1704078522,
        removedAt: null,
        from: "father@gmail.com",
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "Winter Sale!",
        body: "All the shirts in 50%",
        isRead: true,
        isStarred: false,
        sentAt: 1702976732,
        removedAt: null,
        from: "sales@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "Can I come earlier?",
        body: "I have an appointment in tour clinic tomorrow",
        isRead: true,
        isStarred: false,
        sentAt: 1702976900,
        removedAt: null,
        from: "client@momo.com",
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
