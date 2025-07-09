# 🌟 What Rev Can Do

Rev is a full-stack MERN web application that allows users to create, manage, and view custom pages dynamically — perfect for sharing notes, links, content, or small portfolios. Here's what it currently supports:

---

# ✅ User-Centric Features
--Create Unique Pages:
Each user can generate a unique space/page with a unique ID or slug. Example: http://localhost:5173/rev/abcd1234

--Add Content Dynamically:
Add blocks of content (text, images, links, etc.) to a page dynamically and visually.

--Page Viewer Mode:
View any page in a clean read-only format. Share links with others and let them see the content — no login required.

---

# Backend + Logic
MongoDB Storage:
Pages and user-generated content are stored in a MongoDB database.

Auto ID Generation:
When creating a new space, a unique ID is generated automatically.

Express.js APIs:
The backend provides RESTful APIs to fetch or create new pages and save content securely.

---

#💡 Frontend Behaviour
Clean Page UI:
Displays the title and content in a clean, readable format.

Real-Time Edits (Local Only):
Add and remove content dynamically in the UI and see the changes instantly.

Image Upload Support:
Upload an image from your local system and preview it on the page

```bash
git clone https://github.com/Samarth369/rev.git
cd rev
