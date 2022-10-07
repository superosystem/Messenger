# Email Newsletter


# Best Commands

* Project Setup

```bash
# Faster Linking
$ cargo install -f cargo-binutils
$ rustup component add llvm-tools-preview

# Cargo Watch
$ cargo install cargo-watch
$ cargo watch -x check
$ cargo watch -x check -x test -x run

# Code Coverage
$ cargo install cargo-tarpaulin
$ cargo tarpaulin --ignore-tests

# Linting
$ rustup component add clippy
$ cargo clippy
$ cargo clippy -- -D warnings

# Formatting
$ rustup component add rustfmt
$ cargo fmt
$ cargo fmt -- --check

# Security Vulnerabilities
$ cargo install cargo-audit
$ cargo audit

# Web Framework Actix
$ cargo add actix-web --vers 4.0.0
$ cargo install cargo-edit
```