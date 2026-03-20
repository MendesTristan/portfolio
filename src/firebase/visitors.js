import { collection, addDoc, getDocs, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";

function getDeviceInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  let os = "Unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  return { browser, os, device: isMobile ? "Mobile" : "Desktop", userAgent: ua };
}

async function getLocationInfo() {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return { country: "Unknown", city: "Unknown", ip: "Unknown" };
    const data = await res.json();
    return { country: data.country_name || "Unknown", city: data.city || "Unknown", ip: data.ip || "Unknown" };
  } catch {
    return { country: "Unknown", city: "Unknown", ip: "Unknown" };
  }
}

export async function trackVisit(page = "/") {
  if (!isFirebaseConfigured || !db) return;

  try {
    const [deviceInfo, locationInfo] = await Promise.all([
      Promise.resolve(getDeviceInfo()),
      getLocationInfo(),
    ]);

    await addDoc(collection(db, "visitors"), {
      ...deviceInfo,
      ...locationInfo,
      page,
      language: navigator.language || "unknown",
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      referrer: document.referrer || "direct",
      timestamp: Timestamp.now(),
    });
  } catch (err) {
    console.warn("Visitor tracking failed:", err.message);
  }
}

export async function getVisitors(maxCount = 100) {
  if (!isFirebaseConfigured || !db) return [];

  try {
    const q = query(collection(db, "visitors"), orderBy("timestamp", "desc"), limit(maxCount));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.warn("Failed to fetch visitors:", err.message);
    return [];
  }
}

export async function getVisitorStats() {
  if (!isFirebaseConfigured || !db) return { total: 0, today: 0, unique: 0 };

  try {
    const allSnap = await getDocs(collection(db, "visitors"));
    const total = allSnap.size;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayQuery = query(
      collection(db, "visitors"),
      where("timestamp", ">=", Timestamp.fromDate(todayStart)),
    );
    const todaySnap = await getDocs(todayQuery);
    const today = todaySnap.size;

    const ips = new Set();
    allSnap.forEach((doc) => {
      const ip = doc.data().ip;
      if (ip && ip !== "Unknown") ips.add(ip);
    });

    return { total, today, unique: ips.size };
  } catch (err) {
    console.warn("Failed to get visitor stats:", err.message);
    return { total: 0, today: 0, unique: 0 };
  }
}
