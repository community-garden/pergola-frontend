{
  description = "Build the frontend with nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-20.09";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { system="x86_64-linux"; };
  in
  rec {
    legacyPackages.x86_64-linux = {
      jq = pkgs.jq;
      node2nix = pkgs.nodePackages.node2nix;
      deploy = import ./nix/deploy.nix { inherit pkgs; };

      pergola-frontend-deps = import ./nix/override.nix { inherit pkgs; };
      pergola-frontend = import ./nix/default.nix { inherit pkgs; };
    };

    defaultPackage.x86_64-linux = legacyPackages.x86_64-linux.pergola-frontend;
  };
}
