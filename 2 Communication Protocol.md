# 🌐 Network Protocols – Easy Notes

Quick and simple guide to remember key Internet protocols.

---

## 1. HTTP
**What:** Sends and receives web data (pages, images, APIs).  
**How:** Uses TCP (port 80). Each request = new connection.  
**Example:** When you open a website.

---

## 2. HTTP/1.1
**What:** Improved HTTP – reuses the same connection.  
**How:** TCP (port 80). Supports keep-alive.  
**Example:** Older websites and APIs.

---

## 3. HTTP/2
**What:** Faster! Sends many files at once on one connection.  
**How:** TCP + encryption (HTTPS).  
**Example:** Most modern websites.

---

## 4. HTTP/3
**What:** Even faster – works on UDP (via QUIC).  
**How:** Encrypted by default, no delays like TCP.  
**Example:** YouTube, Gmail, and newer browsers.

---

## 5. HTTPS
**What:** Secure version of HTTP. Data is encrypted.  
**How:** Uses TCP (port 443) with TLS.  
**Example:** Any website with a 🔒 lock icon.

---

## 6. WebSocket
**What:** Two-way chat between browser and server (live updates).  
**How:** Starts with HTTP, then upgrades to TCP connection.  
**Example:** Chat apps, live stock prices.

---

## 7. TCP
**What:** Reliable data delivery – ensures nothing is lost.  
**How:** Three-way handshake (SYN, SYN-ACK, ACK).  
**Example:** HTTP, FTP, Email use this.

---

## 8. UDP
**What:** Fast but unreliable – no delivery check.  
**How:** Sends packets directly, no handshake.  
**Example:** Games, video calls, streaming.

---

## 9. SMTP
**What:** Sends emails between servers.  
**How:** TCP (port 25 or 465 for secure).  
**Example:** Gmail sending an email to Outlook.

---

## 10. DNS
**What:** Converts website names to IP addresses.  
**How:** Mostly uses UDP (port 53), TCP if big data.  
**Example:** When you type `google.com` in browser.
---

## 11. FTP
**What:** Moves files between computers.  
**How:** TCP (port 21 control, port 20 data).  
**Example:** Uploading a website to a hosting server.

---

### 🧠 Quick Summary Table

| Protocol | Uses | Transport | Reliable? | Example |
|-----------|------|------------|------------|----------|
| HTTP | Web data | TCP | ✅ | Websites |
| HTTP/1.1 | Faster HTTP | TCP | ✅ | Old sites |
| HTTP/2 | Modern web | TCP | ✅ | Google |
| HTTP/3 | Fast + modern | UDP (QUIC) | ✅ | YouTube |
| HTTPS | Secure web | TCP | ✅🔒 | Banking sites |
| WebSocket | Live data | TCP | ✅ | Chat apps |
| TCP | Reliable base | - | ✅ | File transfer |
| UDP | Speed first | - | ❌ | Gaming, video |
| SMTP | Emails | TCP | ✅ | Gmail send |
| DNS | Name lookup | UDP/TCP | ⚙️ | Web browsing |
| FTP | File transfer | TCP | ✅ | Website upload |

---

**📝 Tip to remember:**  
- “T” in **TCP** = **Trust** (reliable).  
- “U” in **UDP** = **Unreliable** but **Ultra fast**.  
- **HTTP** = Web, **HTTPS** = Secure Web.  
- **WebSocket** = Real-time chat.  
- **FTP** = File transfer.  
- **SMTP** = Send mail.  
- **DNS** = Find address.

