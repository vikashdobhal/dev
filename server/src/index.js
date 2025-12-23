import express from "express";
import cors from "cors";
import { scanUrl } from "./scan.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ada-scan", async (req, res) => {
  const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
          }
          try {
                const result = await scanUrl(url);
                    res.json(result);
                      } catch (err) {
                          res.status(500).json({
                                error: "ADA scan failed",
                                      details: err.message
                                          });
                                            }
                                            });

                                            app.listen(3001, () => {
                                              console.log("ADA Scan API running on port 3001");
                                              });
          