const temp_emails = [
  {
    id: "e101",
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isStarred: false,
    sentAt: 1502976867,
    removedAt: null, //for later use
    from: "momo@momo.com",
    to: "user@appsus.com",
  },
  {
    id: "e102",
    subject: "Winter Sale!",
    body: "All the shirts in 50%",
    isRead: false,
    isStarred: false,
    sentAt: 1702976732,
    removedAt: null, //for later use
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
    removedAt: null, //for later use
    from: "client@momo.com",
    to: "user@appsus.com",
  },
];

const loggedinUser = {
  email: "user@appsus.com",
  fullName: "Mahatma Appsus",
};

const filterBy = {
  status: "inbox/sent/star/trash",
  txt: "puki", // no need to support complex text search
  isRead: true / false / null, // (optional property, if missing: show all)
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

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    var { subject } = filterBy;
    emails = emails.filter(
      (email) =>
        email.subject.toLowerCase().includes(subject.toLowerCase()) ||
        email.body.toLowerCase().includes(subject.toLowerCase())
    );
  }
  return emails;
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
    subject: "",
    body: 0,
    isStarred: false,
    removedAt: "",
    isRead: false,
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
