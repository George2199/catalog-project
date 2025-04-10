from flask import Blueprint, request, jsonify
from extensions import db
from models import Resource, Image

resource_bp = Blueprint('resources', __name__)

@resource_bp.route("/", methods=["GET"])
def get_all_resources():
    query = Resource.query

    sections = request.args.getlist("section")
    if sections:
        query = query.filter(Resource.section.in_(sections))

    resources = query.all()

    result = []
    for r in resources:
        result.append({
            "id": r.id,
            "title": r.title,
            "url": r.url,
            "description": r.description,
            "section": r.section,
            "tags": r.tags,
            "last_updated": r.last_updated,
            "contact_info": r.contact_info,
            "user_id": r.user_id
        })
    return jsonify(result)

@resource_bp.route("/", methods=["POST"])
def add_resource():
    data = request.json
    r = Resource(
        title=data["title"],
        url=data["url"],
        description=data.get("description"),
        section=data.get("section"),
        tags=data.get("tags"),
        last_updated=data.get("last_updated"),
        contact_info=data.get("contact_info"),
        user_id=data["user_id"]
    )
    db.session.add(r)
    db.session.commit()
    return jsonify({"message": "Ресурс добавлен", "id": r.id}), 201

@resource_bp.route("/<int:resource_id>", methods=["GET"])
def get_resource(resource_id):
    resource = Resource.query.get_or_404(resource_id)
    images = Image.query.filter_by(resource_id=resource.id).all()
    return jsonify({
        "id": resource.id,
        "title": resource.title,
        "url": resource.url,
        "description": resource.description,
        "section": resource.section,
        "tags": resource.tags,
        "last_updated": resource.last_updated,
        "contact_info": resource.contact_info,
        "images": [img.image_url for img in images]
    })

@resource_bp.route("/debug", methods=["GET"])
def debug_resources():
    return jsonify([r.id for r in Resource.query.all()])

@resource_bp.route("/", methods=["POST"])
def create_resource():
    data = request.get_json()

    resource = Resource(
        title=data.get("title"),
        url=data.get("url"),
        section=data.get("section"),
        tags=data.get("tags"),
        description=data.get("description"),
        contact_info=data.get("contact_info"),
        user_id=data.get("user_id")
    )

    db.session.add(resource)
    db.session.commit()

    return jsonify({"message": "Resource created", "id": resource.id}), 201
