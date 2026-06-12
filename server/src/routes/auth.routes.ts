import { Router, Request, Response, IRouter } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/token.service";

const router: IRouter = Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

// ── Register ──────────────────────────────────────────
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Store access token in httpOnly cookie
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Store refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ── Login ─────────────────────────────────────────────
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Store access token in httpOnly cookie
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Store refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ── Refresh Token ─────────────────────────────────────
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      res.status(401).json({ message: "No refresh token" });
      return;
    }

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Set new access token cookie
    res.cookie("accessToken", newAccessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

// ── Logout ────────────────────────────────────────────
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// ── Google OAuth ──────────────────────────────────────
router.post("/google", async (req: Request, res: Response) => {
  try {
    const { name, email, avatar } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    // Find existing user or create new one
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar,
        // no password — Google users don't have one
      });
    }

    // Generate tokens — same as email/password login
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
    });

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
