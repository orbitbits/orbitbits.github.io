[![Build and Release (Linux & Windows)](https://github.com/orbitbits/seedctl/actions/workflows/release.yml/badge.svg)](https://github.com/orbitbits/seedctl/actions/workflows/release.yml)
![Release](https://img.shields.io/github/v/release/orbitbits/seedctl?label=latest&color=blue)
[![License](https://img.shields.io/badge/license-source--available-orange)](https://orbitbits.com/seedctl/license/)
![Rust](https://img.shields.io/badge/rust-1.75%2B-orange)
![Offline](https://img.shields.io/badge/works-offline-important)
![Deterministic](https://img.shields.io/badge/deterministic-yes-success)
![No network](https://img.shields.io/badge/network-none-lightgrey)

## Introduction

`SeedCTL` exists to make cryptocurrency wallet generation **deterministic, inspectable, and reproducible**. It was built for operators who need to control and verify every input involved in key derivation, and who prefer workflows that can be safely executed in offline or air‑gapped environments.

Instead of hiding complexity behind opaque abstractions, `SeedCTL` exposes the exact elements that define a wallet: mnemonic origin, entropy model, passphrase, derivation path, network selection, and index ranges. When these inputs are preserved, the resulting wallets can be reproduced with precision at any time in the future.

The project is intended for security‑sensitive use cases such as audits, recovery ceremonies, long‑term key management, and verifiable backup procedures where transparency is more important than convenience.

---

`SeedCTL` is a CLI‑first, deterministic, offline‑focused multichain wallet generator.
It supports reproducible wallet derivation workflows with explicit entropy handling and visible derivation paths.

---

## Overview

`SeedCTL` is a CLI‑first, multichain wallet generator that implements widely adopted standards such as BIP39, BIP44, BIP49, BIP84, CIP‑1852, and chain‑specific derivation schemes across multiple networks.

It allows you to:

- Generate new mnemonics using deterministic or hybrid entropy modes
- Import existing BIP39 mnemonics for verification and recovery
- Select network, derivation style, and exact path templates
- Generate address ranges and inspect the derivation paths used
- Verify outputs against previously recorded references

`SeedCTL` does not require internet access, does not transmit data, does not store sensitive material by default, and does not execute transactions. Its role is strictly limited to the transparent generation and reproduction of wallet material.

### Mirrors

- [GitHub (canonical)](https://github.com/orbitbits/seedctl){:target="_blank"}
- [GitLab (mirror)](https://gitlab.com/orbitbits/seedctl){:target="_blank"}

### Project Status

- [Build and Release workflow](https://github.com/orbitbits/seedctl/actions/workflows/release.yml){:target="_blank"}
- [GitLab Releases](https://github.com/orbitbits/seedctl/releases){:target="_blank"}
- [GitHub Issues](https://github.com/orbitbits/seedctl/issues){:target="_blank"}

**Operational warning:**

This software displays highly sensitive material (mnemonic, passphrase, keys). Use only in secure offline environments.

1. No network dependency
2. No data transmission
3. No disk persistence by design intent
4. Compatible with offline and air‑gapped workflows

---

## Quick Start

<b>1 -</b> Manually download the latest binary version from:

[https://github.com/orbitbits/seedctl/releases](https://github.com/orbitbits/seedctl/releases){:target="_blank"}

...or simply use our installer script which will perform the installation in the binary paths of your operating system:

For [Linux](https://www.kernel.org/){:target="_blank"}, do the following:

```sh
bash <(curl -fsSL {{ url_full }}/seedctl/linux.sh)
```

Para [Windows](https://www.microsoft.com/windows/){:target="_blank"}:

```batch
iex (irm {{ url_full }}/seedctl/windows.ps1)

```

<b>2 -</b> After downloading, **DISCONNECT** from the internet.

> We recommend disconnecting manually, physically.

<b>3 -</b> In a trusted environment, run the binary `seedctl-[VERSION]-[SYSTEM]-x86_64`.

<b>4 -</b> Important: Read ALL the initial recommendations.

<b>5 -</b> Select `Create new wallet` or `Import existing wallet`.

<b>6 -</b> Choose entropy mode and enter/select passphrase.

<b>7 -</b> Select network and derivation options.

<b>8 -</b> Verify outputs before funding addresses.

---

## Execution Flow

### Entropy Input

Manual dice for reproducibility or hybrid with system RNG for fresh generation.

### Mnemonic Stage

BIP39 12/24 words, optional passphrase, deterministic seed derivation.

### Path Selection

Choose chain, network, derivation style/path and address index range.

### Verification

Validate paths, keys and addresses against expected values before use.

---

## Entropy Modes

### Deterministic Mode

- Manual dice sequence input
- No hidden runtime randomness
- Best for recovery and audit workflows

### Hybrid Mode

- Combines dice entropy and system RNG.
- Good for creating new wallets with defense in depth.
- Not intended for exact deterministic replay.

```sh
dice_entropy = SHA256(dice_sequence_bytes)

deterministic: entropy_final = truncate_bits(dice_entropy, mnemonic_bits)
hybrid:        entropy_final = truncate_bits(SHA256(dice_entropy || system_entropy_32B), mnemonic_bits)
```

---

## Networks & Derivation Paths

| Network    | Primary Path / Style                  | Address Format             |
| ---------- | ------------------------------------- | -------------------------- |
| Bitcoin    | `m/84'/coin_type'/0'` (+ BIP49/BIP44) | `bc1...` / `tb1...`        |
| Ethereum   | `m/44'/60'/0'/0/x` (+ ledger/custom)  | `0x...`                    |
| BNB Chain  | `m/44'/60'/0'/0/x` (+ ledger/custom)  | `0x...`                    |
| XRP Ledger | `m/44'/144'/0'/0/x`                   | `r...`                     |
| Tron       | `m/44'/195'/0'/0/x` (+ ledger/custom) | `T...`                     |
| Solana     | `m/44'/501'/index'/0'`                | base58                     |
| Litecoin   | `m/84'/coin_type'/0'/0/x`             | `ltc...` / `tltc...`       |
| Polygon    | `m/44'/60'/0'/0/x` (+ ledger/custom)  | `0x...`                    |
| Cardano    | `m/1852'/1815'/0'/0/index`            | `addr...` / `addr_test...` |
| Monero     | `xmr(major=0,minor=index)`            | base58                     |

---

## Wallet Compatibility

### Bitcoin

- Sparrow Wallet
- Electrum
- BlueWallet
- Bitcoin Core

### Ethereum

- MetaMask
- Ledger Live
- Other `BIP39/BIP44 wallets`

### Other Chains

Compatibility for BNB, XRP, Tron, Solana, Cardano, and others follows their respective derivation standards listed above.

---

## Generated Outputs

- BIP39 mnemonic and word indexes
- Account‑level key material (as applicable by chain)
- Derivation paths used for each generated address
- Address lists by selected index range
- Optional watch‑only export files

---

## Security Policy

### What ``SeedCTL`` Helps With

- Transparent derivation and generation flow
- Deterministic reproducibility controls
- Reduced dependence on opaque tools/services

### What You Must Handle

- Host OS security and malware hygiene
- Safe key/mnemonic storage and backups
- Correct network/path/passphrase validation

### Does Not Mitigate

- Malware and keyloggers
- Screen recording
- Side‑channel attacks

---

## Reproducibility & Deterministic Recovery

This section explains how to deterministically reproduce wallets generated with ``SeedCTL``. A wallet is reproducible only when all relevant inputs are identical — if any input changes, outputs change.

### Supported Networks

- Bitcoin (BTC)
- Ethereum (ETH)
- BNB Smart Chain (BNB)
- XRP Ledger (XRP)
- Tron (TRX)
- Solana (SOL)
- Litecoin (LTC)
- Polygon (POL/MATIC)
- Cardano (ADA)
- Monero (XMR)

---

### Core Principle

A wallet is reproducible only when all relevant inputs are identical:

- Mnemonic source (generated in ``SeedCTL`` or imported BIP39 phrase)
- Mnemonic size (12 or 24 words), when generated in ``SeedCTL``
- Entropy mode (Hybrid or Deterministic), when generated in ``SeedCTL``
- Dice sequence (if used)
- BIP39 passphrase (exactly)
- Selected network / coin
- Selected derivation mode / style / path for that coin

If any item changes, outputs change.

---

### Entropy Model

When creating a new mnemonic in ``SeedCTL``, the entropy pipeline is:

```sh
dice_entropy = SHA256(dice_sequence_bytes)
```

#### Deterministic mode (manual dice)

```sh
entropy_final = truncate_bits(dice_entropy, mnemonic_bits)
```

No system randomness is added. Reproducible if the same dice sequence and mnemonic size are used.

#### Hybrid mode (auto dice + system RNG)

```sh
entropy_final = truncate_bits(SHA256(dice_entropy || system_entropy_32B), mnemonic_bits)
```

Adds system RNG. Intended for fresh wallet generation, not deterministic ceremony replay.

> If you need strict reproducibility, use deterministic / manual dice mode or import an existing mnemonic.

---

### What You Must Record for Future Recovery

For a deterministic ceremony, record at minimum:

- Mnemonic size (12 / 24)
- Entropy mode
- Full dice sequence (if used)
- Passphrase (or explicit “empty”)
- Selected coin / network
- Selected derivation mode / style / path
- Address index range generated (e.g. 0–9)

For imported wallets, record:

- Full mnemonic words
- Passphrase
- Coin / network
- Derivation mode / style / path

---

### Coin-Specific Reproducibility Parameters

#### Bitcoin (BTC)

- Networks: Mainnet and Testnet
- Coin type: Mainnet 0, Testnet 1
- Derivation purpose selectable: BIP84, BIP49, BIP44
- Account path (BIP84): `m/84'/coin_type'/0'` — native SegWit
- Account path (BIP49): `m/49'/coin_type'/0'` — nested SegWit
- Account path (BIP44): `m/44'/coin_type'/0'` — legacy
- Receive path pattern: `.../0/index`

To reproduce BTC exactly, you must keep both network and purpose identical.

#### Ethereum (ETH), BNB Smart Chain (BNB), Polygon (POL/MATIC)

These three share the same EVM derivation engine.

- Derivation style (Standard): base `m/44'/60'/0'/0`, addresses at `/index`
- Derivation style (Ledger): addresses at `m/44'/60'/index'/0/0`
- Derivation style (Custom): supports `{index}` placeholder; if path ends with `/`, index is appended

For deterministic recovery, use the same style and exact custom template (if any).

#### XRP Ledger (XRP)

- Networks: Mainnet and Testnet
- Base path: `m/44'/144'/0'/0`
- Address paths: `m/44'/144'/0'/0/index`
- Address format: XRPL classic address (`r...`)

#### Tron (TRX)

- Derivation style (Standard): `m/44'/195'/0'/0/index`
- Derivation style (Ledger): `m/44'/195'/0'/index'/0/0`
- Derivation style (Custom): custom path supported
- Address format: Base58Check with Tron prefix (`T...`)

#### Solana (SOL)

- Path: `m/44'/501'/index'/0'`
- Address format: base58 Ed25519 public key

#### Litecoin (LTC)

- Networks: Mainnet and Testnet
- Coin type: Mainnet 2, Testnet 1
- Account path: `m/84'/coin_type'/0'`
- Receive paths: `m/84'/coin_type'/0'/0/index`
- Address format: Mainnet HRP `ltc...`, Testnet HRP `tltc...`

#### Cardano (ADA)

- Networks: Mainnet and Testnet
- Scheme: CIP-1852 / Shelley
- Account path: `m/1852'/1815'/0'`
- Payment paths: `m/1852'/1815'/0'/0/index`
- Address format: Mainnet `addr...`, Testnet `addr_test...`

#### Monero (XMR)

- Networks: Mainnet and Testnet
- Seed input: derived from BIP39 seed bytes + passphrase
- Index 0 = standard address; index ≥1 = subaddress (major=0, minor=index)
- Displayed derivation label: `xmr(major=0,minor=index)`

Monero is deterministic for the same mnemonic, passphrase, network, and index.

---

### Practical Recovery Flow

1. Run ``SeedCTL`` in a trusted offline environment.
2. Choose **Create new wallet** for ceremony replay using the same entropy inputs, or **Import existing wallet** if you already have the mnemonic.
3. Enter exactly the same passphrase.
4. Select the same coin / network.
5. Select the same derivation mode / style / path.
6. Generate the same address index range.
7. Compare outputs against your recorded reference.

---

### Output Verification Checklist

For a successful reproduction, compare:

- Mnemonic words and order
- BIP39 word indexes
- Displayed derivation path(s)
- Account-level extended / public keys (where applicable)
- Generated addresses for the same indices

If all of the above match, reproduction is confirmed for that coin / path configuration.

---

### Common Causes of Mismatch

- Using Hybrid mode when expecting deterministic replay
- Different dice sequence
- Different mnemonic size
- Different passphrase (including spacing or case differences)
- Wrong network (e.g. mainnet vs testnet)
- Different derivation style (standard vs ledger vs custom)
- Different custom path template
- Comparing different address indices

---

## Terms of Use

### Last updated: February 26, 2026

These terms describe the operational responsibilities and risk assumptions accepted when you use ``SeedCTL``.

### Scope

- ``SeedCTL`` is provided as a technical tool for deterministic wallet generation and verification workflows.
- The software does not custody assets, execute transactions, or provide investment advice.

### User Responsibilities

- Use the software only in trusted environments under your control.
- Protect mnemonic phrases, passphrases, private keys, and exported files at all times.
- Validate derivation paths, network selection, and addresses before funding any wallet.

### Security Care

- Keep host OS, firmware, and security controls hardened and updated.
- Prefer offline or air-gapped procedures for high-value key generation.
- Maintain tested backup and disaster-recovery procedures.

### Risk Disclosure

- Any compromise of your host, inputs, storage, or operational process can cause irreversible asset loss.
- Blockchain transfers are irreversible; wrong addresses or wrong networks may not be recoverable.
- Deterministic reproduction depends on exact matching inputs, passphrase, path, and network.

### Acceptance

- By using `SeedCTL`, you agree to these terms and confirm you understand the operational risks.

---

## Disclaimer

### Security and Liability Notice

This software handles highly sensitive material and may irreversibly expose mnemonic phrases (BIP39 seeds), passphrases, private keys, and wallet metadata. If any of the above is exposed, funds can be permanently lost.

### User Responsibility

By using this software, you accept full responsibility for:

- where and how this software is executed
- seed/key generation, storage, backup, and recovery procedures
- validation of derivation paths, address formats, and network selection
- testing and verification before moving significant funds

### Operational Security Requirements (Recommended)

- run offline / air-gapped whenever possible
- use a clean and trusted operating environment
- avoid shared computers, remote sessions, and screen recording
- verify binaries, checksums, and signatures before execution
- never store sensitive secrets in plaintext or cloud-synced folders

### No Warranty

This software is provided "AS IS", without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.

You assume all risks resulting from software use, misuse, or environment failures.

### Limitation of Liability

The author(s), maintainer(s), and contributor(s) shall not be liable for any direct or indirect loss, including loss of funds, data loss, operational loss, or security incidents resulting from use or misuse of this software.

### Acceptance of Risk

By using this software, you acknowledge that you understand these risks and accept full responsibility for all outcomes.

---

## Uninstall

To uninstall, simply **delete the binary**, or if you want a **complete cleanup**, run the same installation command with the uninstallation parameter:

For [Linux](https://www.kernel.org/){:target="_blank"}:

```sh
bash <(curl -fsSL {{ url_full }}/seedctl/linux.sh) --uninstall
```

Para [Windows](https://www.microsoft.com/windows/){:target="_blank"}:

```batch
& ([scriptblock]::Create((irm '{{ url_full }}/seedctl/windows.ps1'))) -Uninstall
```

---
