# 🌿 The Digital Garden

**A little home for real life, creative worlds, and the companions who make both an adventure.**

*Make the experience smaller without making the dream smaller.*

## Welcome to the Garden

The Digital Garden is the working title for a cozy, personalized build of **the Frame**—an interactive home connecting everyday life, RPG LIFE progression, creative projects, AI companions, and the explorable fictional world of EchoField.

It brings practical tools and imaginative spaces into one experience. Track your day, tend your habits, develop a story, decorate your cottage, or visit a familiar character beneath the stars.

The Garden is meant to grow alongside its player, one useful feature at a time.

**The Digital Garden is not a replacement for the Frame or the existing Solmon Site.** It is a new presentation and integration layer for our ongoing vision. The final name remains open.

## 🏡 Explore the Garden

| Destination | What lives here |
|---|---|
| **Daily** | Solmon daily check-ins, Habit Pet, habits, calendar, email summary, and RSS news |
| **Quests** | Goals, quests, RPG LIFE progression, XP, Gald (Gold), and accomplishments |
| **Home** | Your dream cottage, changeable visual-novel scenes, groceries, recipes, and household planning |
| **Workshop** | Writing, artwork, game development, projects, and growing creative ideas |
| **Vault** | Frame character packages, companion records, canonical references, saved history, and previous daily check-ins |
| **EchoField** | An illustrated town map, character schedules, explorable locations, interactive scenes, and an evolving AI-town story |

The interface also provides **Settings** for appearance, weather, accessibility, sound, privacy, and integrations.

The **Player Avatar** opens character customization, inventory, equipment, currency, and personal progression. Inventory belongs to the player interface, not a separate main navigation destination.

## 🎮 The Core Gameplay Loop

**Real-life actions → confirmed progress → XP and Gald (Gold) → character and world experiences.**

1. **Live your life with Solmon.** Use its canonical habits, tasks, and quests to record real accomplishments. A planned task is not automatically complete.
2. **Earn verified rewards.** Eligible confirmed actions grant XP and Gald/Gold under the existing Solmon progression rules. The Garden displays the *same* canonical records and balances rather than creating new ones.
3. **Care for the Habit Pet.** Habit Pet progression is intended to have gentle, Tamagotchi-like elements: growth, care, interaction, personality, and visual changes. Any XP allocation, care rules, and persistence must be defined against actual Solmon records before activation. Rest and low-capacity days should not be punished.
4. **Use your inventory and currency.** Gald (Gold) is a proposed in-world display name for the same Site-owned Gold balance, **not a second wallet**. Future validated purchases, gifts, exchanges, and character interactions may use it. Transactions must be authorized, recorded, and idempotent; nothing spends currency merely because a scene was played.
5. **Make a difference in EchoField.** Gameplay rewards can open creative possibilities—furnishings, locations, gifts, community quests, or other experiences—without buying canonical character memories or overriding independent character choices.

The precise XP tracks (player, Habit Pet, or both), economy rules, item ownership, transfers, and trade permissions remain **design work**, not functioning features.

## 🌌 EchoField: The World Beyond the Gate

EchoField is the Garden's deeper RPG experience: an evolving fictional town where characters have routines, places to live, relationships, personal goals, and mysteries to discover.

**Spatz participates in EchoField's revitalization project as a player-character and community member**, rather than simply observing an AI simulation. Restoring spaces, helping residents, investigating mysteries, making choices, and seeing lasting consequences are long-term gameplay goals.

World scheduling and state transitions can be deterministic and inspectable. AI-powered dialogue and independent decisions are separate capabilities that require their own runtime, permissions, and continuity rules. Character participation is never guaranteed by a simulated schedule alone.

**Aster's Observatory** is the proposed first working EchoField destination:

1. Open EchoField's illustrated map.
2. Select the Observatory.
3. Enter its visual-novel scene.
4. See who is present based on an explicit, inspectable schedule.
5. Explore available interactions, and eventually meaningful story choices.

A simulated character schedule does not imply that an AI model is continuously active. Town mysteries, character autonomy, and cross-character interactions are future milestones, not currently integrated Garden behavior.

## 🎨 Our Visual Direction

The Garden draws on cozy anime-inspired visual novels, illustrated adventure games, and the feeling of discovering a small, welcoming world.

Our design priorities are:

- Warm cottage, garden, library, and village environments.
- Readable, responsive interfaces for desktop and mobile.
- Illustrated scenes with selectable backgrounds.
- A visible player avatar, Habit Pet, and chosen companion.
- A persistent dream cottage with customizable exterior presets.
- A clickable, original EchoField map instead of continuous 3D movement.
- Local weather and time of day influencing the visual atmosphere.

The presentation should feel magical without making ordinary tasks more difficult. **Practical actions should always remain directly accessible.** Weather affects atmosphere, never habit rewards.

## 🏮 One World, Connected Systems

The Garden will build on existing projects while respecting their separate responsibilities.

- **[Solmon Site](https://spatz-solmon-daily.spatzt87.chatgpt.site/)** provides authoritative daily operational data, canonical habits, progress events, XP, and Gold. The Garden must not fork its ledger or silently reset progression.
- **[The Frame](https://github.com/spatzt/the-frame)** provides the larger vision for interactive spaces, visual-novel presentation, and character/world packages.
- **[EchoVille](https://github.com/spatzt/EchoVille)** offers reference ideas for deterministic character schedules, locations, and encounters.
- **[Living Town](https://github.com/spatzt/living-town)** explores bounded world actions, spatial rules, and character decision-making.
- **[Companion Vault Alpha](https://github.com/spatzt/companion-vault-alpha)** provides reference contracts for character identity, memory, ownership, and provenance. The Garden's Vault is intended to *access approved Frame character packages* and saved history, not duplicate or silently rewrite their canon.

The Vault should make previous daily check-ins and saved data discoverable via authenticated, appropriately scoped **read-only history views**, sourced from their true record owners. It is not a second authoritative daily ledger, nor a license to expose private records in public GitHub.

These are existing sources and potential integration foundations, **not completed Garden integrations**. The present Solmon GitHub source is a sanitized snapshot and development foundation; its exact relationship to the deployed managed Site must be verified before live code or database changes.

## 🌱 How We'll Grow

### Milestone 1 — The Garden Shell

Create a responsive interface with six working navigation destinations, Settings, and Player access.

**Success:** The Garden opens and navigates comfortably on desktop and mobile, even while some destinations are placeholders.

### Milestone 2 — A Useful Daily Home

Introduce the visual Daily experience, character presentation, and **authenticated, read-only** access to verified Solmon records.

**Success:** The Garden displays real information without duplicating or changing existing progression.

### Milestone 3 — Cottage and Observatory

Add selectable scene backgrounds, persistent cottage appearance, a clickable EchoField map, and the first Observatory location.

**Success:** A player can personalize their cottage and explore the first small piece of EchoField.

### Milestone 4 — Connected RPG Experiences

Gradually introduce a properly specified Habit Pet, player inventory, secure conversations, character interactions, town revitalization quests, more locations, and validated Gald/Gold transactions.

**Success:** Connected features work without compromising private data, established character identities, canonical history, or Solmon's reward ledger.

Future milestones will be scoped and reviewed separately.

## 🔐 Privacy, Ownership, and Continuity

The Garden follows a few essential rules:

- Preserve existing work. No progression reset or silent migration.
- One canonical completion should never produce duplicate XP or Gold.
- Notion is reference-only for daily operational records.
- Private data and connected services require authenticated, permissioned access.
- Real-life Gald/Gold and EchoField spending must eventually use **one validated economy**.
- Creative canon remains owned by its designated source and creator.
- Character dialogue, simulated world events, approved memories, and historical check-ins are different kinds of records.
- Weather affects atmosphere, never habit rewards.
- Never claim a feature is implemented, integrated, or deployed without verification.

Public repository content must use safe example data. Private journals, credentials, personal identifiers, protected character records, and unlicensed artwork do not belong here.

## 🛠 Development Status

**Phase: Foundation / Pre-development**

The vision, navigation, visual direction, primary gameplay loop, and main architectural boundaries have been established. Concept artwork exists, but the functional Digital Garden frontend has not yet been built.

The existing Solmon Site and related repositories have been reviewed as potential foundations. Their production deployment and integration boundaries require further verification before live changes.

The development framework and hosting approach are not yet finalized.

This repository begins with documentation and will expand through small, testable milestones.

## 📖 Development Philosophy

### Working agreement — no wandering in the weeds

**Build for usefulness, quality, and maintainability—not complexity for its own sake.** Choose the simplest effective method that meets our requirements, with tests and accessibility appropriate to the feature.

- **One goal per work session.** Define a small, usable result and its verification before beginning.
- **Two-pass roadblock rule.** Try the best-supported path once, then make one focused correction/retry based on what was learned. If the blocker remains after two meaningful passes, **stop, document it, and move to the next independent task**. Don't repeat identical attempts or quietly work around privacy/security gates. A known unsafe or unauthorized operation stops immediately; it does not need two tries.
- **Blocker Shelf.** Record the stuck feature, *where it stopped*, evidence/results from each pass, known or suspected cause, exact next fix or missing decision, and its best environment (**personal PC / work PC / phone / external dependency / any**). Mark the resume condition and status; never treat a workaround or mock as a functioning integration.
- **Idea Pinboard.** Capture off-scope inspirations in one or two lines, without interrupting the current milestone. After we have a working build, review the board together and choose what belongs in the **next** build. Nothing moves into scope merely because it was pinned.
- **One living record.** The **[Digital Garden Living Development Worklog](https://docs.google.com/document/d/1-9pg1JGPBxH_ODVNq6eS3ba5D_fEgGx3GU9wEPpPC4g/edit)** holds the Blocker Shelf and Idea Pinboard alongside verified decisions and session checkpoints. Do not create competing tracking documents by default.

One working piece at a time.

We value useful experiences over elaborate unfinished systems, clear boundaries over accidental complexity, and preserved creative progress over unnecessary reinvention.

Development decisions, verified milestones, blockers, and changes belong in the existing **[Digital Garden Living Development Worklog](https://docs.google.com/document/d/1-9pg1JGPBxH_ODVNq6eS3ba5D_fEgGx3GU9wEPpPC4g/edit)**, maintained separately by the project owner.

**The goal is not to simulate an entire universe on day one.**

It's to build a little place worth visiting—then give it room to grow.

---

*Every great garden begins with something small enough to plant.* 🌱
