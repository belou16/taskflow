"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupérer tous les projets
export async function GET() {
  try {
    const projets = await prisma.projet.findMany({
      orderBy: { date_creation: "desc" },
    });

    return NextResponse.json(projets);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des projets" },
      { status: 500 },
    );
  }
}

// Créer un nouveau projet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const id_projet = body.id_projet;
    const titre = body.titre;
    const description = body.description;
    const status = body.status;

    // On vérifie que tous les champs sont bien remplis
    if (!id_projet || !titre || !description || !status) {
      return NextResponse.json(
        { error: "id_projet, titre, description et status sont requis" },
        { status: 400 },
      );
    }

    const nouveauProjet = await prisma.projet.create({
      data: {
        id_projet: id_projet,
        titre: titre,
        description: description,
        status: status,
        date_creation: new Date(),
        date_modification: new Date(),
      },
    });

    return NextResponse.json(nouveauProjet, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erreur lors de la création du projet" },
      { status: 500 },
    );
  }
}
